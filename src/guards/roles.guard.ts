import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { arrayMatching } from '../utils/array.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRoles = [];

    for (const item of user.roles) {
      userRoles.push(item.role.name);
    }

    return arrayMatching(userRoles, roles);
  }
}