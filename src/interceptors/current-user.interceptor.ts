import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UsersService } from "../users/users.service";

export function CurrentUser(dto: any) {
  return UseInterceptors(new CurrentUserInterceptor(dto));
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
      const { userId } = request.session || {};
      if (userId) {
      const user = await this.usersService.findOneById(userId);
      request.currentUser = user;
    }
    return next.handle();
  }
}
