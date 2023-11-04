import {Role} from "./role.enum";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
