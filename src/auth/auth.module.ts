import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (conf: ConfigService) => ({
        secret: conf.get<string>("JWT_SECRET"),
        expiresIn: conf.get<string>("JWT_EXPIRATION"),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
