import { BaseModel, schemaOptions } from 'shared/base.model';
import { PostCategory } from './post-category.enum';
import { prop, ModelType } from 'typegoose';

export class Post extends BaseModel<Post> {
  @prop({ required: [true, 'Title is required'] })
  title: string;
  @prop({ required: [true, 'Body is required'] })
  body: string;
  @prop({ enum: PostCategory, default: PostCategory.Uncategorized })
  category: PostCategory;
  @prop({ default: false })
  isPublished: boolean;

  static get model(): ModelType<Post> {
    return new Post().getModelForClass(Post, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
