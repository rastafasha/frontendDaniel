import { Payment } from "./payment";
import { Post } from "./post";
import { Profile } from "./profile";

export class User {

  public profile?: Profile;
  public pago?: Payment;
  public blog?: Post;

  constructor(
    public username: string,
    public email: string,
    public terminos: boolean,
    public password?: string,
    public google?: boolean,
    public role?: 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER',
    public uid?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ){}

}

export class Role {
  id: number;
  name: string;
  }
