import { CreateBrandDto } from '../dtos/create-brand.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  name?: string;
}
