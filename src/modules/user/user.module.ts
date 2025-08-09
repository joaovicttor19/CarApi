import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { Brand } from '../brand/brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Brand])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
