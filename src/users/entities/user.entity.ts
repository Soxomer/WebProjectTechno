import { Role } from "./role.enum";
import { Exclude } from "class-transformer";

export class User {
  id: number;
  name: string;
  firstName: string;
  email: string;
  age: number;
  password: string;
  role: Role;
}
