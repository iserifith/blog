import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): any {
    return {
      code: 200,
      message: "NestJS"
    }
  }
}
