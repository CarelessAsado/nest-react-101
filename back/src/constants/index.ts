export const FRONTEND_URL = process.env.NODE_ENV
  ? 'COMPLETAR DSP'
  : 'http://localhost:3000';

export const COOKIE_RT_KEY = 'jwtRefreshToken';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true,
};

class URL_BACK_ENDPOINTS {
  ROOT = '/api/v1';
  PREGUNTAS = `${this.ROOT}/preguntas`;
  AUTH = '/users/auth';
  LOGIN = `${this.AUTH}/login`;
  REGISTER = `${this.AUTH}/register`;
  REFRESH = `${this.AUTH}/refresh`;
  LOGOUT = `${this.AUTH}/logout`;
}
export const BACKEND_ENDPOINTS = new URL_BACK_ENDPOINTS();
