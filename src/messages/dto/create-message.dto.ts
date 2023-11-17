import {Message} from "../entities/message.entity";
import {PartialType} from "@nestjs/mapped-types";

export class CreateMessageDto extends PartialType(Message) {
}
