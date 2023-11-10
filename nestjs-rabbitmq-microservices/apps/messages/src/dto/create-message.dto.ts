import {Message} from "../entities/message.entity";

export class CreateMessageDto extends Message {
  sender: string;
  content: string;
}

