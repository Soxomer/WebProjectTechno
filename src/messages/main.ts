import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
