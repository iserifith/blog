import { BaseModelVm } from 'shared/base.model';
import { PostCategory } from '../post-category.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from 'shared/utilities/enum-to-array';

export class PostVm extends BaseModelVm {
  @ApiModelProperty() title: string;
  @ApiModelProperty() body: string;
  @ApiModelProperty({ enum: EnumToArray(PostCategory) })
  category: PostCategory;
  @ApiModelProperty() isPublished: boolean;
}
