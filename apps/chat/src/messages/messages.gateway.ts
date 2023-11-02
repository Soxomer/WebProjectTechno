import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket} from '@nestjs/websockets';
import {MessagesService} from './messages.service';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {Server, Socket} from "socket.io";

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class MessagesGateway {
    @WebSocketServer()
    server : Server;

    constructor(private readonly messagesService: MessagesService) {
    }

    @SubscribeMessage('createMessage')
    async create(@MessageBody() createMessageDto: CreateMessageDto) {
        const message = await this.messagesService.create(createMessageDto);
        this.server.emit('newMessage', message);
        return message;
    }

    @SubscribeMessage('findAllMessages')
    findAll() {
        return this.messagesService.findAll();
    }

    @SubscribeMessage('join')
    join(
        @MessageBody('name') name: string,
        @ConnectedSocket() client: Socket
    ) {
        this.messagesService.join(name,client.id);
    }

    @SubscribeMessage('typing')
    typing(@MessageBody('isTyping') isTyping: boolean,
           @ConnectedSocket() client: Socket) {
        const name = this.messagesService.getClientName(client.id);
       return  client.broadcast.emit('typing', {name, isTyping});
    }
}
