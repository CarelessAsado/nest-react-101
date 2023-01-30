import { config } from 'dotenv';
import { CookieOptions } from 'express';
config();
export const FRONTEND_URL = process.env.NODE_ENV
  ? 'COMPLETAR DSP'
  : 'http://localhost:3000';

export const COOKIE_RT_KEY = 'jwtRefreshToken';
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true,
};

class URL_BACK_ENDPOINTS {
  ROOT = '/api/v1';
  PREGUNTAS = `${this.ROOT}/preguntas`;
  AUTH = '/auth';
  USER = '/user';
  LOGIN = `/login`;
  REGISTER = `/register`;
  REFRESH = `/refresh`;
  LOGOUT = `/logout`;
}
export const BACKEND_ENDPOINTS = new URL_BACK_ENDPOINTS();

export const AWS_ENV_VARS = {
  CLIENTID: process.env.CLIENTID || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
};

export const COGNITO_CONFIG = {
  REGION: 'us-east-1',
  POOL_ID: 'us-east-1_a2t24pqqN',
  ...AWS_ENV_VARS,
};
