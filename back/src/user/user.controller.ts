import { Controller, Get } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { BACKEND_ENDPOINTS } from 'src/constants';
import { UserDBService } from './userDB.service';

@Controller(BACKEND_ENDPOINTS.USER)
export class UserController {
  constructor(private userDBService: UserDBService) {}
  @Get()
  getAllUsers(@Req() req: Request & { user?: IUser }): Promise<IUser[]> {
    console.log(req?.user);
    return this.userDBService.findAllUsers();
  }
}
