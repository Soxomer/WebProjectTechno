import {Injectable} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {Message} from "./entities/message.entity";

@Injectable()
export class MessagesService {
  messages: Message[] = [{sender: "omar", content: 'random texte'}];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message: Message = {
      sender: this.clientToUser[clientId],
      content: createMessageDto.content
    };
    this.messages.push(message);
    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }

  join(name: string, clientId: string): string[] {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  typing() {
    // todo
  }
}
