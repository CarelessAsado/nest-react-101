import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/userDB.service';

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
