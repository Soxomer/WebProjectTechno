import {Injectable, Logger} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {Message} from "./entities/message.entity";

@Injectable()
export class MessagesService {
  messages: Message[] = [{sender: "omar", content: 'random texte'}];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto, clientId: string) {

    Logger.log(" createMessageDto");
    Logger.log("contenu:" + createMessageDto);

    const message = {
      name: this.clientToUser[clientId],
      content: createMessageDto
    };

    this.messages.push(createMessageDto)
    return message;
  }

  findAll() {
    return this.messages;
  }

  join(name: string,
       clientId: string) {
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
