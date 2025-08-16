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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() brand: CreateBrandDto) {
    return this.brandService.create(brand);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.brandService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') brand_id: string) {
    return this.brandService.findOne(brand_id);
  }

  @UseGuards(AuthGuard)
  @Get('user/id')
  async findByUser(@Param('id') user_id: string) {
    return this.brandService.findByUser(user_id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') brand_id: string,
    @Body() update: Partial<UpdateBrandDto>,
  ) {
    return this.brandService.update(brand_id, update);
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') brand_id: string) {
    return this.brandService.delete(brand_id);
  }
}
