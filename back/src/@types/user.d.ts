type IUser = {
  name: string;
  id: number;
  email: string;
  sub: string;
  password: string;
};

type RegisterInputType = Pick<IUser, 'email' | 'name' | 'password'>;
type LoginInputType = Pick<IUser, 'email' | 'password'>;

type LoginResponse = {
  user: IUser;
  accessToken: string;
  idToken: string;
};

type RefreshResponse = Pick<LoginResponse, 'accessToken' | 'idToken'>;
