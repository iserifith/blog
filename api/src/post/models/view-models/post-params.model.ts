import { PostCategory } from '../post-category.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from 'shared/utilities/enum-to-array';

export class PostParams {
  @ApiModelProperty() title: string;
  @ApiModelProperty() body: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(PostCategory) })
  category?: PostCategory;
  @ApiModelPropertyOptional() isPublished?: boolean;
}
