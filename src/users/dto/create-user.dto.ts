import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from "class-validator";
import { UsePipes } from "@nestjs/common";
import { VinciEmailPipe } from "../../auth/Pipes/vinci-email.pipe.service";
import { Exclude } from "class-transformer";

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
