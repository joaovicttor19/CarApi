import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';
@Controller('carmodel')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post('create')
  create(@Body() carModel: CreateCarModelDto) {
    return this.carModelService.create(carModel);
  }

  @Get()
  async findAll() {
    return this.carModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id_model: string) {
    return this.carModelService.findOne(id_model);
  }

  @Get('brand/:id')
  async findByBrand(@Param('id') brand_id: string) {
    return this.carModelService.findByBrand(brand_id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id_model: string,
    @Body() update: Partial<UpdateCarModelDto>,
  ) {
    return this.carModelService.update(id_model, update);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id_model: string) {
    return await this.carModelService.delete(id_model);
  }
}
