import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDBService } from './userDB.service';

@Module({
  controllers: [UserController],
  providers: [UserDBService],
  exports: [UserDBService],
})
export class UserModule {}
