import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'user/models/user-role.enum';
import { InstanceType } from 'typegoose';
import { User } from 'user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflactor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflactor.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: InstanceType<User> = request.user;

    const hasRole = () => roles.indexOf(user.role) >= 0;

    if (user && user.role && hasRole()) {
      return true;
    }

    throw new HttpException(
      'You do not have permission.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
