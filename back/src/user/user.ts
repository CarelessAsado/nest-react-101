import { Injectable } from '@nestjs/common';

@Injectable()
export class User<T> {
  users: T[] = [{ name: 'rodi', id: 123, email: '' }] as T[];
  findAllUsers = () => {
    return this.users;
  };
  addUser = function (user: T) {
    this.users.push(user);
  };
}

//como yo no puego agregarle el type asi, xq no llamo a la clase, calculo q x eso se usa el otro sistema bizarro, ver dsp bien como se define el Model (si es en la clase, o x afuera)
//y si fuera x afuera, ya mientras voy definiendo los métodos de la clase deberia tener tipado, mmm, ver si puedo usarlo a lo casero ese modulo, seria interesante, aunq ahora viendo el controller constructor, al cual hago de cuenta q le imporrto el user
/* class DB<T> {
  users: T[] = [{ name: 'rodi', id: 123, email: '' }] as T[];
  findAllUsers = () => {
    return this.users;
  };
  addUser = function (user: T) {
    this.users.push(user);
  };
}

type IUser = { name: string; id: number; email: string };
type IUser = DB["users"][0] 
const db = new DB<IUser>();

db.addUser({ name: 'rodi', id: 123, email: '' }); */
