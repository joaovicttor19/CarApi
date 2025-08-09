import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  create(@Body() brand: CreateBrandDto) {
    return this.brandService.create(brand);
  }

  @Get()
  async findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') brand_id: string) {
    return this.brandService.findOne(brand_id);
  }

  @Get('user/id')
  async findByUser(@Param('id') user_id: string) {
    return this.brandService.findByUser(user_id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') brand_id: string,
    @Body() update: Partial<UpdateBrandDto>,
  ) {
    return this.brandService.update(brand_id, update);
  }

  @Delete('delete/:id')
  async delete(@Param('id') brand_id: string) {
    return this.brandService.delete(brand_id);
  }
}
