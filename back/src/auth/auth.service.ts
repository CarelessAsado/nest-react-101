import { CognitoIdentityServiceProvider, ConfigService } from 'aws-sdk';
import { COGNITO_CONFIG } from 'src/constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private config = {
    apiVersion: '2016-04-18',
    region: COGNITO_CONFIG.REGION,
    //estas dos keys no fueron necesarias hasta el logout
    //access token is still valid, delete on the front
    accessKeyId: COGNITO_CONFIG.AWS_ACCESS_KEY_ID,
    secretAccessKey: COGNITO_CONFIG.AWS_SECRET_ACCESS_KEY,
    //Client secret depende si optas o no, al crear la app
  };
  private clientId = COGNITO_CONFIG.CLIENTID;

  private cognitoIdentity: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoIdentity = new CognitoIdentityServiceProvider(this.config);
    console.log(
      'we calledddddddddddddddddddddddddddddddddddddddddddddddddd',
      999,
    );
  }

  registerUser(email: string, password: string) {
    const params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: email /* required */,
    };
    return this.cognitoIdentity.signUp(params).promise();
  }

  loginUser(email: string, password: string) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH' /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    return this.cognitoIdentity.initiateAuth(params).promise();
  }

  logout(token: string) {
    const params = {
      AccessToken: token,
    };
    return this.cognitoIdentity.globalSignOut(params).promise();
  }

  forgotPwd(email: string) {
    const params = {
      ClientId: this.clientId,
      Username: email,
    };
    return this.cognitoIdentity.forgotPassword(params).promise();
  }

  async confirmNewPassword(email: string, password: string, code: string) {
    const params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: email /* required */,
    };
    return this.cognitoIdentity.confirmForgotPassword(params).promise();
  }

  refreshMyToken(refreshTkn: string) {
    const params = {
      ClientId: this.clientId /* required */,
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshTkn,
      },
    };
    return this.cognitoIdentity.initiateAuth(params).promise();
  }

  deleteAccount(accessTkn: string) {
    const params = {
      AccessToken: accessTkn,
    };
    return this.cognitoIdentity.deleteUser(params).promise();
  }
}
