import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {MessagesService} from './messages.service';
import {CreateMessageDto} from './dto/create-message.dto';
import {Server, Socket} from "socket.io";
import {Message} from "./entities/message.entity";

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const message = this.messagesService.create(createMessageDto, client.id);
    client.broadcast.emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(): Message[] {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  join(
      @MessageBody('name') name: string,
      @ConnectedSocket() client: Socket
  ): string[] {
    return this.messagesService.join(name, client.id);
  }

}
