import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { CarModel } from '../car-model/car-model.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,

    @InjectModel(CarModel)
    private readonly carModel: typeof CarModel,
  ) {}

  async create(vehicle: CreateVehicleDto): Promise<Vehicle> {
    await this.validateCarModelExists(vehicle.id_model);
    await this.validateUniquePlate(vehicle.plate);

    return await this.vehicleModel.create(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleModel.findAll({ include: [CarModel] });
  }

  async findOne(vehicle_id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findByPk(vehicle_id, {
      include: [CarModel],
    });

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    return vehicle;
  }

  async findByUser(user_id: string): Promise<Vehicle[]> {
    return await this.vehicleModel.findAll({
      where: { user_id },
      include: [CarModel],
    });
  }

  async update(vehicle_id: string, update: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(vehicle_id);

    if (update.plate) {
      await this.validateUniquePlate(update.plate);
    }

    if (update.id_model) {
      await this.validateCarModelExists(update.id_model);
    }
    await vehicle.update(update);
    return vehicle;
  }

  async delete(vehicle_id: string): Promise<{ message: string }> {
    const vehicle = await this.findOne(vehicle_id);
    await vehicle.destroy();
    return { message: 'Veículo removido com sucesso' };
  }

  private async validateCarModelExists(carmodel_id: string): Promise<void> {
    const carModelExists = await this.carModel.findByPk(carmodel_id);
    if (!carModelExists) {
      throw new HttpException(
        'CarModel não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateUniquePlate(plate: string): Promise<void> {
    const plateExists = await this.vehicleModel.findOne({
      where: { plate },
    });
    if (plateExists) {
      throw new HttpException('Placa já cadastrada', HttpStatus.BAD_REQUEST);
    }
  }
}
