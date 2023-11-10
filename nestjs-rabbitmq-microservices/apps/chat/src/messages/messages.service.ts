import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ sender: 'omar', content: 'random texte' }];
  clients = {};

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    return this.messages.push(createMessageDto);
  }

  findAll() {
    return this.messages;
  }

  join(name: string, clientId: string) {
    this.clients[clientId] = name;
    return Object.values(this.clients);
  }
  getClientName(clientId: string) {
    return this.clients[clientId];
  }
  typing() {
    // todo
  }
}
