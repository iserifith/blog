import {
  Controller,
  Post as PostDeco,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
  Body,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Post } from './models/post.model';
import { PostService } from './post.service';
import { map, isArray } from 'lodash';
import { PostParams } from './models/view-models/post-params.model';
import { PostVm } from './models/view-models/post-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { MapperService } from 'shared/mapper/mapper.service';
import { PostCategory } from './models/post-category.enum';
import { ToBooleanPipe } from 'shared/pipes/to-boolean.pipes';
import { Roles } from 'shared/decorators/roles.decorators';
import { UserRole } from 'user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guards';

@Controller('posts')
@ApiUseTags(Post.modelName)
@ApiBearerAuth()
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @PostDeco()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Post.modelName, 'Create'))
  async create(@Body() params: PostParams): Promise<PostVm> {
    const { title, body } = params;

    if (!title) {
      throw new HttpException('Title is required.', HttpStatus.BAD_REQUEST);
    }

    if (!body) {
      throw new HttpException('Body is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPost = await this._postService.createPost(params);
      return this._postService.map<PostVm>(newPost);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: PostVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
  @ApiOperation(GetOperationId(Post.modelName, 'Get All'))
  @ApiImplicitQuery({
    name: 'category',
    required: false,
    isArray: true,
    collectionFormat: 'multi',
  })
  @ApiImplicitQuery({
    name: 'isPublished',
    required: false,
  })
  async get(
    @Query('category') category?: PostCategory,
    @Query('isPublished', new ToBooleanPipe())
    isPublished?: boolean,
  ): Promise<PostVm[]> {
    let filter = {};

    if (category) {
      filter['category'] = {
        $in: isArray(category) ? [...category] : [category],
      };
    }

    if (isPublished !== null) {
      if (filter['category']) {
        filter = { $and: [{ category: filter['category'] }, { isPublished }] };
      } else {
        filter['isPublished'] = isPublished;
      }
    }

    try {
      const posts = await this._postService.findAll(filter);
      return this._postService.map<PostVm[]>(
        map(posts, post => post.toJSON()),
        true,
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Post.modelName, 'Update'))
  async update(@Body() vm: PostVm): Promise<PostVm> {
    const { id, title, body, category, isPublished } = vm;

    if (!vm || !id) {
      throw new HttpException('Missing parameters.', HttpStatus.BAD_REQUEST);
    }

    const exists = await this._postService.findById(id);

    if (!exists) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }

    exists.title = title;
    exists.body = body;
    exists.category = category;
    exists.isPublished = isPublished;

    try {
      const updated = await this._postService.update(id, exists);
      return this._postService.map<PostVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: PostVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Post.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<PostVm> {
    try {
      const deleted = await this._postService.delete(id);
      return this._postService.map<PostVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('id')
  @ApiResponse({ status: HttpStatus.OK, type: PostVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Post.modelName, 'Show'))
  async show(@Param('id') id: string): Promise<PostVm> {
    try {
      const post = await this._postService.findById(id);
      return this._postService.map<PostVm>(post.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
