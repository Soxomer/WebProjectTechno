import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const logMessage = new Logger('MessagesGateway');
    logMessage.log('createMessage');
    const message = await this.messagesService.create(
      createMessageDto,
      client.id,
    );
    logMessage.debug(message);
    this.server.emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  join(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    this.messagesService.join(name, client.id);
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messagesService.getClientName(client.id);
    return client.broadcast.emit('typing', { name, isTyping });
  }
}
