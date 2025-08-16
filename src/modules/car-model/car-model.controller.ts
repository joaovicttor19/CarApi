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
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('carmodel')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() carModel: CreateCarModelDto) {
    return this.carModelService.create(carModel);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.carModelService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id_model: string) {
    return this.carModelService.findOne(id_model);
  }

  @UseGuards(AuthGuard)
  @Get('brand/:id')
  async findByBrand(@Param('id') brand_id: string) {
    return this.carModelService.findByBrand(brand_id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id_model: string,
    @Body() update: Partial<UpdateCarModelDto>,
  ) {
    return this.carModelService.update(id_model, update);
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id_model: string) {
    return await this.carModelService.delete(id_model);
  }
}
