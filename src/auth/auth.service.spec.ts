import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

describe("AuthService", () => {
  let service: AuthService;
  const mockjwtService = {};
  const mockUserService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService],
    })
      .overrideProvider(JwtService)
      .useValue(mockjwtService)
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
