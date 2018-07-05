import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Post } from './models/post.model';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { PostParams } from './models/view-models/post-params.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @InjectModel(Post.modelName) private readonly _postModel: ModelType<Post>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _postModel;
    this._mapper = _mapperService.mapper;
  }

  async createPost(params: PostParams): Promise<Post> {
    const { title, body, category } = params;

    const newPost = new this._model();
    newPost.title = title;
    newPost.body = body;

    if (category) {
      newPost.category = category;
    }

    try {
      const result = await this.create(newPost);
      return result.toJSON() as Post;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
