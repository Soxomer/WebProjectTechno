import {Injectable} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {Message} from "./entities/message.entity";
import {isUUID} from "class-validator";

@Injectable()
export class MessagesService {
    messages: Message[] = [{sender: "omar", content: 'random texte'}];
    clientToUser = {};

    create(createMessageDto: CreateMessageDto, clientId: string) {
        const message = {
            name: this.clientToUser[clientId],
            test: createMessageDto.content
        }
        return this.messages.push(createMessageDto);
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
