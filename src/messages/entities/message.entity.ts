import {IsNotEmptyObject, IsString} from "class-validator";

export class Message {
  @IsString()
  @IsNotEmptyObject()
  sender: string;
  content: string;
}
