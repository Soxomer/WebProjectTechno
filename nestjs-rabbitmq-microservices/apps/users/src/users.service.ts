import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    if (this.existByEmail(createUserDto.email)) {
      throw new Error('User already exist');
    }
    const user = new User();
    user.id = this.users.length + 1;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    console.log(id);
    return this.users.find((user) => user.id === id);
  }

  existByEmail(email: string) {
    return this.users.some((user) => user.email === email);
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
}
