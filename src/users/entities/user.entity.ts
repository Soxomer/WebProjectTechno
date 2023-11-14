import {Role} from "./role.enum";

export class User {
  id: number;
  name: string;
  firstName: string;
  email: string;
  age: number;
  password: string;
  role: Role;
}
