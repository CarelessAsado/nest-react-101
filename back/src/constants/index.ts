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

export const STATUS_PAGO = {
  PENDIENTE: 'pendiente',
  APROBADO: 'aprobado',
  CANCELADO: 'cancelado',
};

export const STATUS_ENVIO = {
  PENDIENTE: 'pendiente',
  ENVIADO: 'enviado',
  EN_CAMINO: 'en camino',
};

export const BULK_EDIT_OPTIONS = {
  PRECIO: 'precio',
  PRECIO$: '$',
  PRECIO_PERCENTAGE: '%',
  PRECIO_ADD: '+',
  PRECIO_SUBTRACT: '-',
  STOCK: 'stock',
  PROMO: 'promo',
  DESTACADO: 'destacado',
};

/* Si cambio esto lo tengo q cambiar en el front tmb */
export const PREGUNTAS_LIMIT = 10;

//EL FRONT TMB TIENE CELU EN CONSTANTS, cambiar ambos
export const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=54${process.env.CELU}&text&type=phone_number&app_absent=0`;

class URL_BACK_ENDPOINTS {
  ROOT = '/api';
  PRODUCTOS = '/productos';
  PREGUNTAS = `${this.ROOT}/preguntas`;
  AUTH = '/users/auth';
  COMPRAS = '/checkout/pagos';
  PROFILE = '/profile';
  PROFILE_EDIT_PWD = `${this.PROFILE}/pwd`;
  MARCAS = '/marcas';
  VISITS = `${this.ROOT}/visits`;
  LOGIN = `${this.AUTH}/login`;
  REGISTER = `${this.AUTH}/register`;
  REFRESH = `${this.AUTH}/refresh`;
  LOGOUT = `${this.AUTH}/logout`;
  CONTACT = `${this.AUTH}/contact`;
  CHECKCART = `${this.PRODUCTOS}/checkcart`;
}
export const BACKEND_ENDPOINTS = new URL_BACK_ENDPOINTS();
