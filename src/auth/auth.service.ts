import {Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginAuthDto} from "./dto/login.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {TokenPayload} from "./dto/TokenPayload";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Home-made login
  async signIn(loginInfo: LoginAuthDto): Promise<any> {
    const user = await this.usersService.findByEmail(loginInfo.email);
    if (user?.password !== loginInfo.password) {
      throw new UnauthorizedException();
    }
    const payload: TokenPayload = { id: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
