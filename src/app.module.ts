import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { DatabaseModule } from './database/database.module';
import { BrandModule } from './modules/brand/brand.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    CarModelModule,
    BrandModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
