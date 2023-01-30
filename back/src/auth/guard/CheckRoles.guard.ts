import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { checkPublicDecorator } from './utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('ROLES GUARD NOW');

    //it returns the boolean we set on the decorator, if the route is public we avoid decoding jwt
    if (checkPublicDecorator(this.reflector, context)) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //if u didnt pass any roles, its undefined
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<ContextAuth>();
    const user = request.user;
    console.log(user);
    return true;
    /* return matchRoles(roles, user.roles); */
  }
}
