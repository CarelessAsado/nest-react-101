import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import { COGNITO_CONFIG } from 'src/constants';
import { UserDBService } from 'src/user/userDB.service';
import { checkPublicDecorator } from './utils';

let pems: { [key: string]: any } = {};

@Injectable()
export class AuthGuard implements CanActivate {
  private poolRegion: string = COGNITO_CONFIG.REGION;
  private userPoolId: string = COGNITO_CONFIG.POOL_ID;

  constructor(
    @Inject(UserDBService) private userDBService: UserDBService,
    private reflector: Reflector,
  ) {
    this.setUp();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ContextAuth>();
    console.log('AUTH GUARD in URL: ', request.url);

    //it returns the boolean we set on the decorator, if the route is public we avoid decoding jwt
    if (checkPublicDecorator(this.reflector, context)) {
      return true;
    }

    //decode + check user and add to Context
    return this.verifyToken(request);
  }

  async verifyToken(req: ContextAuth) {
    const headerToken = req.headers.auth;
    console.log(headerToken);
    if (!headerToken || typeof headerToken !== 'string') return false;

    //aca hago un decoding light, ver cual es la razon de esto
    let decodedJwt: any = jwt.decode(headerToken, { complete: true });

    if (decodedJwt === null || decodedJwt.payload?.token_use !== 'access') {
      return false;
    }

    console.log(decodedJwt, 'decodedJWT, light decoding');

    let kid = decodedJwt.header.kid;
    let pem = pems[kid];

    if (!pem) {
      return false;
    }
    try {
      const awsPayload = jwt.verify(headerToken, pem);

      //Add user to the request object
      if (typeof awsPayload?.sub !== 'string') {
        throw Error('Sub is not a string');
      }
      const user = await this.userDBService.findUserByAWSSub(awsPayload.sub);

      if (!user) {
        throw Error();
      }
      req.user = user;
      return true;
    } catch (error) {
      console.log(error?.message);
      return false;
    }
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful';
      }
      const data: any = await response.json();

      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };

        const pem = jwkToPem(jwk);

        pems[key_id] = pem;
      }
      console.log('got PEMS');
    } catch (error) {
      console.log(error);
      console.log('Error! Unable to download JWKs');
    }
  }
}
