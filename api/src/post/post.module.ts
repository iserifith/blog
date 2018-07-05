import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from './models/post.model';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.modelName, schema: Post.model.schema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
