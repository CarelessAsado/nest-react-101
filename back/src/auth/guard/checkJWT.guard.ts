import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.route.path.includes('auth')) {
      console.log('we in auth');
    }
    /*    console.log(request, 333); */
    console.log('AUTH GUARD', 666);
    return true;
  }
}
