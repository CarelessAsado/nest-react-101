import { Controller, Get } from '@nestjs/common';
import { UserDBService } from './userDB.service';

@Controller('user')
export class UserController {
  constructor(private userDBService: UserDBService) {}
  @Get()
  getAllUsers(): Promise<IUser[]> {
    return this.userDBService.findAllUsers();
  }
}
