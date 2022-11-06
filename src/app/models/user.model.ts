import { Role } from './role.model';
export class User{
  id: number;
  email: string;
  password: string;
  name: string;
  randomCode: string;
  roles: Role[];
}
