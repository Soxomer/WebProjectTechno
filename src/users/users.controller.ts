import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes,} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {VinciEmailPipe} from "../auth/Pipes/vinci-email.pipe.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new VinciEmailPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // http://localhost:3000/users?age=20
  @Get()
  findAll(@Query("age") age?: number) {
    if (age) {
      return this.usersService.findAllByAge(age);
    }
    return this.usersService.findAll();
  }

  // http://localhost:3000/users/1
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
