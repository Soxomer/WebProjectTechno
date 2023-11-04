import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({
  imports: [UsersModule, MessagesModule, AuthModule],
})
export class AppModule {}