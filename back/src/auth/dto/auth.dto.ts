import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class RegisterInputDTO implements RegisterInputType {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

export class LoginInputDTO
  extends PickType(RegisterInputDTO, ['password', 'email'])
  implements LoginInputType {}
