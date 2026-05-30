/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(          //what roles are allowed - get the allowed roles
      ROLES_KEY, [
        context.getHandler(), //method
        context.getClass(), //controller/class
      ]                              
    );
    if(!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string>}>();     
    const userRole = request.headers['x-user-role'] as Role;                   //what is the user's role
    return requiredRoles.includes(userRole);                                  // If role matches → allow request
  }
}
