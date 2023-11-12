import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { describe, mock } from "node:test";
import { Role } from "./entities/role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import exp from "node:constants";
describe("UsersService", () => {
  let service: UsersService;

  //mock pour verifier le bon fonctionnement de FindAll
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  //TEST FIND_ALL
  describe("found All ", () => {
    it("should return a list of 3 user", () => {
      const all = service.findAll();
      expect(all).toHaveLength(3);
    });
  });
  //TEST FIND_ONE
  describe("found one id:2", () => {
    it("should return user:2 ", () => {
      expect(service.findOne(2)).toEqual({
        id: 2,
        name: "jean",
        firstName: "valjean",
        age: 23,
        email: "jean@gmail.com",
        password: "MySuperjeanP@ssw0rd!",
        role: Role.CLIENT,
      });
    });
  });
  // TEST CREATE
  describe("create new user", () => {
    const mockNewUser: CreateUserDto = {
      name: "bob",
      firstName: "newUser",
      age: 30,
      email: "new@gmail.com",
      password: "4",
    };

    it("should a list with user in it", () => {
      expect(service.create(mockNewUser)).toContainEqual({
        id: expect.any(Number),
        name: "bob",
        firstName: "newUser",
        age: 30,
        email: "new@gmail.com",
        password: "4",
        role: Role.CLIENT,
      });
    });
  });
});
