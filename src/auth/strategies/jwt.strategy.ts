import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TokenPayload} from "../dto/TokenPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly conf: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    return payload;
  }
}
