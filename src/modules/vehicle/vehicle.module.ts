import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { CarModel } from '../car-model/car-model.entity';
import { Brand } from '../brand/brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle, CarModel, Brand])],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
