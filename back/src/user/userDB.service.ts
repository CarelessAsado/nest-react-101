import { Injectable } from '@nestjs/common';

//en mongoose se define el schema en otro lado, o sea schema => service => controller => MODULE

@Injectable()
export class UserDBService {
  users: IUser[] = [
    { name: 'rodi', id: 123, email: '', sub: '123', password: '' },
    {
      email: 'rodrigohernanlopez89@gmail.com',
      password: '12344556ssA@',
      id: 1,
      sub: 'e4188e03-3392-4059-b7b6-2b36fa8ffac3',
      name: 'Rodrigo 2',
    },
  ];

  findAllUsers = () => {
    return Promise.resolve(this.users);
  };

  addUser = async (user: IUser) => {
    await Promise.resolve(this.users.push(user));
    return user;
  };

  findUserByMail = async (email: string) => {
    return Promise.resolve(this.users.find((user) => user.email === email));
  };
}
