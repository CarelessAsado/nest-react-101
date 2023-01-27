import { Controller } from '@nestjs/common';
import { Get, Post, Body, Res, Req } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { COOKIE_OPTIONS, COOKIE_RT_KEY } from 'src/constants';
import { UserDBService } from '../user/userDB.service';
import { LoginInputDTO, RegisterInputDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userDBService: UserDBService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegisterInputDTO): Promise<IUser> {
    console.log(
      '🚀 ~ file: user.controller.ts:22 ~ UserController ~ registerUser ~ user',
      user,
    );

    const data = await this.authService.registerUser(user.email, user.password);
    console.log(data);
    return this.userDBService.addUser({
      ...user,
      sub: data.UserSub,
      id: 1234,
    });
  }

  //CHANGE INPUTDTO TO A MORE SPECIFIC ONE
  @Post('login')
  async loginUser(
    @Body() user: LoginInputDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    console.log(
      '🚀 ~ file: user.controller.ts:22 ~ UserController ~ registerUser ~ user',
      user,
    );

    const { AuthenticationResult } = await this.authService.loginUser(
      user.email,
      user.password,
    );

    const accessToken = AuthenticationResult?.AccessToken || '';
    const refreshToken = AuthenticationResult?.RefreshToken || '';
    const idToken = AuthenticationResult?.IdToken || '';

    response.cookie(COOKIE_RT_KEY, refreshToken, COOKIE_OPTIONS);

    const userFound = await this.userDBService.findUserByMail(user.email);
    if (!userFound) {
      throw Error('User not found in DB');
    }

    return {
      accessToken,
      idToken,
      user: userFound,
    };
  }
  //CHANGE INPUTDTO TO A MORE SPECIFIC ONE
  @Get('refresh')
  async refreshMyToken(@Req() request: Request): Promise<RefreshResponse> {
    const oldRefreshToken = request.cookies?.[COOKIE_RT_KEY];

    //it doesnt return a refresh tkn
    const { AuthenticationResult } = await this.authService.refreshMyToken(
      oldRefreshToken,
    );

    const accessToken = AuthenticationResult?.AccessToken || '';

    const idToken = AuthenticationResult?.IdToken || '';

    return {
      accessToken,
      idToken,
    };
  }

  @Get('logout')
  async logoutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = req.headers?.auth;

    //if I sent empty auth header, it was passing as a string, thats why I included double check
    if (accessToken && typeof accessToken === 'string') {
      //it returns NOTHING
      await this.authService.logout(accessToken);
    }

    if (req.cookies?.[COOKIE_RT_KEY]) {
      res.clearCookie(COOKIE_RT_KEY, COOKIE_OPTIONS);
    }

    return;
  }
}
