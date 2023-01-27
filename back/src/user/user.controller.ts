import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/checkJWT.guard';
import { UserDBService } from './userDB.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userDBService: UserDBService) {}

  @Get()
  getAllUser(): Promise<IUser[]> {
    return this.userDBService.findAllUsers();
  }
}
