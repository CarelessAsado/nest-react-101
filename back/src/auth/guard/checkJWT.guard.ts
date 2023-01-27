import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import { COGNITO_CONFIG } from 'src/constants';

let pems: { [key: string]: any } = {};

type ContextAuth = Request & { user?: IUser };
@Injectable()
export class AuthGuard implements CanActivate {
  private poolRegion: string = COGNITO_CONFIG.REGION;
  private userPoolId: string = COGNITO_CONFIG.POOL_ID;

  constructor() {
    this.setUp();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AUTH GUARD', 666);

    const request = context.switchToHttp().getRequest<ContextAuth>();
    if (/* request.route.path */ request.url.includes('auth')) {
      console.log('we in auth');
      return true;
    }
    console.log(request.headers, 333);

    //decode
    return this.verifyToken(request);
    //check user and add to Context
  }

  verifyToken(req: ContextAuth) {
    const headerToken = req.headers.auth as string;
    console.log(headerToken);
    if (!headerToken) return false;
    //aca hago un decoding light, ver cual es la razon de esto
    let decodedJwt: any = jwt.decode(headerToken, { complete: true });
    if (decodedJwt === null || decodedJwt.payload?.token_use !== 'access') {
      return false;
    }

    console.log(decodedJwt, 'decodedJWT, light decoding');
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    console.log(pem, 'pem anda a saber q es');
    if (!pem) {
      return false;
    }
    try {
      const userMaybe = jwt.verify(headerToken, pem);
      console.log(userMaybe, 'ver en q se diferencian los ID del access');
      //Add user to the request object
      req.user = { sub: userMaybe.sub as string } as IUser;
      return true;
    } catch (error) {
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
