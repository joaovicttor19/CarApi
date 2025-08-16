import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async findByUser(@Param('id') user_id: string): Promise<Vehicle[]> {
    return this.vehicleService.findByUser(user_id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }
}
