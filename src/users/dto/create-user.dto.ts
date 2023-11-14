import {IsNotEmpty, IsNumber, IsString, IsStrongPassword,} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNumber()
  age: number;

  // validated at controller level
  email: string;

  @IsStrongPassword()
  password: string;
}
