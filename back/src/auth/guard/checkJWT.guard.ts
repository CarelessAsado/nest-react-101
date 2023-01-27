import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwkToPem from 'jwk-to-pem';
import { COGNITO_CONFIG } from 'src/constants';
import { Request } from 'express';

let pems: { [key: string]: any } = {};

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

    const request = context.switchToHttp().getRequest<Request>();
    if (/* request.route.path */ request.url.includes('auth')) {
      console.log('we in auth');
      return true;
    }
    console.log(request.headers, 333);
    if (request.headers.auth) {
      console.log('JWT MAGIC WITH PEM');
      //decode
      //check user and add to Context
    }

    return true;
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful';
      }
      const data: any = await response.json();
      console.log(data);
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
