import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Brand } from 'src/modules/brand/brand.entity';
import { CarModel } from 'src/modules/car-model/car-model.entity';
import { User } from 'src/modules/user/user.entity';
import { Vehicle } from 'src/modules/vehicle/vehicle.entity';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, CarModel, Vehicle, Brand],
      logging: true,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],

  controllers: [],
  providers: [],
})
export class DatabaseModule {}
