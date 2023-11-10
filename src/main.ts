import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { VinciEmailPipe } from "./auth/Pipes/vinci-email.pipe.service";
import { ConfigModule } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  ConfigModule.forRoot({
    isGlobal: true,
  });

  // add swagger
  const options = new DocumentBuilder()
    .setTitle("NestJS example")
    .setDescription("The NestJS API description")
    .setVersion("1.0")
    .addTag("nestjs")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
