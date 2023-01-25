import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators';
import { IUser, UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<IUser[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  registerUser(user: IUser): Promise<IUser> {
    if (!user?.name) {
      throw Error('VALIDATION ERROR');
    }
    return this.userService.addUser(user);
  }
}
