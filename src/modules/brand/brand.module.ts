import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brand.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand, User])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
