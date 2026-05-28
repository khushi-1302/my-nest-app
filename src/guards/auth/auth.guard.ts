/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();       //fetches the request coming from user
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const authHeader = request.headers['authorization'];      //checks if the request has authorization header

    return authHeader === 'Bearer my-secret-token';         //token value should match with this
  }
}
