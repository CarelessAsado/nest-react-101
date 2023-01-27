type IUser = {
  name: string;
  id: number;
  email: string;
  sub: string;
  password: string;
};

type ContextAuth = import('express').Request & { user?: IUser };

type RegisterInputType = Pick<IUser, 'email' | 'name' | 'password'>;
type LoginInputType = Pick<IUser, 'email' | 'password'>;

type LoginResponse = {
  user: IUser;
  accessToken: string;
  idToken: string;
};

type RefreshResponse = Pick<LoginResponse, 'accessToken' | 'idToken'>;
