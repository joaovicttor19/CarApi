import { PartialType } from '@nestjs/mapped-types';
import { CreateCarModelDto } from './create-car-model.dto';

export class UpdateCarModelDto extends PartialType(CreateCarModelDto) {
  name?: string;
  yearmanufacture?: string;
  price?: number;
}
