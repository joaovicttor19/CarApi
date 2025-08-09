import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') user_id: string): Promise<User> {
    return await this.userService.findOne(user_id);
  }

  @Patch('update/:id')
  async update(@Param('id') user_id: string, @Body() user: UpdateUserDto) {
    return await this.userService.update(user_id, user);
  }

  @Delete('delete/:id')
  async delete(@Param('id') user_id: string) {
    return await this.userService.delete(user_id);
  }
}
