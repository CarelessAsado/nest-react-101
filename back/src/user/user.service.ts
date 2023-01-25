import { Injectable } from '@nestjs/common';
//en mongoose se define el schema en otro lado, o sea schema => service => controller => MODULE
export type IUser = { name: string; id: number; email: string };

@Injectable()
export class UserService {
  users: IUser[] = [{ name: 'rodi', id: 123, email: '' }];
  findAllUsers = () => {
    return Promise.resolve(this.users);
  };
  addUser = async function (user: IUser) {
    await Promise.resolve(this.users.push(user));
    return user;
  };
}
