import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.modelName,
        schema: User.model.schema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
