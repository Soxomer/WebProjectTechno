import {Module} from '@nestjs/common';
import {MessagesController} from './messages.controller';
import {MessagesService} from './messages.service';
import {MessagesGateway} from './messages.gateway';

@Module({
  imports: [MessagesModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {
}
