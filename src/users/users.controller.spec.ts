import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { describe } from "node:test";

describe("UsersController", () => {
  let controller: UsersController;

  const mockUserService = {
    findAll: jest.fn().mockReturnValue("function findAll as been called."),
    // eslint-disable-next-line prettier/prettier
    findAllByAge: jest.fn().mockReturnValue("function indAllByAge as been called."),
    findOne: jest.fn().mockReturnValue("function findAll as been called."),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("get /", () => {
    it("should call the findAll function", () => {
      expect(controller.findAll()).toBe("function findAll as been called.");
    });
  });
});
