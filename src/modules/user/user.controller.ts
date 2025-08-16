import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('active')
  async findAllActive() {
    return await this.userService.findAllActive();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') user_id: string): Promise<User> {
    return await this.userService.findOne(user_id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async update(@Param('id') user_id: string, @Body() user: UpdateUserDto) {
    return await this.userService.update(user_id, user);
  }

  @UseGuards(AuthGuard)
  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    return await this.userService.deactivate(id);
  }
}
