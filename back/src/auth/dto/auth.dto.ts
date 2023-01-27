import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterInputDTO implements RegisterInputType {
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
export class LoginInputDTO implements LoginInputType {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
