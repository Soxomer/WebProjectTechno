import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.enum";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "John",
      firstName: "Doe",
      age: 20,
      email: "nest@gmail.com",
      password: "MySuperP@ssw0rd!",
      role: Role.ADMIN,
    },
    {
      id: 2,
      name: "jean",
      firstName: "valjean",
      age: 23,
      email: "jean@gmail.com",
      password: "MySuperjeanP@ssw0rd!",
      role: Role.CLIENT,
    },
    {
      id: 3,
      name: "Marie",
      firstName: "Antoinette",
      age: 36,
      email: "monarchie@gmail.com",
      password: "MySuperMarieP@ssw0rd!",
      role: Role.CLIENT,
    },
  ];

  create(createUserDto: CreateUserDto): User[] {
    const existingUser = this.findByEmail(createUserDto.email);
    if (existingUser) {
      Logger.log(`User with email ${createUserDto.email} already exists`);
      throw new ConflictException();
    }

    const user: User = {
      id: this.users.length + 1,
      role: Role.CLIENT,
      ...createUserDto,
    };

    this.users.push(user);

    return this.users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    console.log(id);
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index] = { ...user, ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return this.users;
  }

  findAllByAge(age: number) {
    return this.users.filter((user) => user.age === age);
  }
}
