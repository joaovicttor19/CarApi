import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  plate?: string;
  color?: string;
  yearOfManufacture?: string;
  mileage?: number;
}
