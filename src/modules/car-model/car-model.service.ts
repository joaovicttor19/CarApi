import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './car-model.entity';
import { Brand } from '../brand/brand.entity';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/update-car-model.dto';

@Injectable()
export class CarModelService {
  constructor(
    @InjectModel(CarModel) private readonly carModel: typeof CarModel,
    @InjectModel(Brand) private readonly brandModel: typeof Brand,
  ) {}

  async create(createCarModelDto: CreateCarModelDto): Promise<CarModel> {
    await this.validateBrand(createCarModelDto.brand_id);
    await this.validateName(createCarModelDto.name);

    return this.carModel.create(createCarModelDto);
  }

  async findAll(): Promise<CarModel[]> {
    return await this.carModel.findAll({
      include: [Brand],
    });
  }

  async findOne(id_model: string): Promise<CarModel> {
    const carModel = await this.carModel.findByPk(id_model, {
      include: [Brand],
    });

    if (!carModel) {
      throw new HttpException('Modelo não encontrado', HttpStatus.NOT_FOUND);
    }

    return carModel;
  }

  async findByBrand(brand_id: string): Promise<CarModel[]> {
    await this.validateBrand(brand_id);

    return await this.carModel.findAll({
      where: { brand_id },
      include: [Brand],
    });
  }

  async update(
    id_model: string,
    updateCarModelDto: UpdateCarModelDto,
  ): Promise<CarModel> {
    const carModel = await this.findOne(id_model);

    if (updateCarModelDto.name) {
      await this.validateName(updateCarModelDto.name);
    }
    if (updateCarModelDto.brand_id) {
      await this.validateBrand(updateCarModelDto.brand_id);
    }

    await carModel.update(updateCarModelDto);
    return carModel;
  }

  async delete(id_model: string): Promise<{ message: string }> {
    const carModel = await this.findOne(id_model);
    await carModel.destroy();

    return { message: 'Modelo excluído com sucesso' };
  }

  private async validateName(name: string): Promise<void> {
    const modelAlreadyExists = await this.carModel.findOne({
      where: { name },
    });

    if (modelAlreadyExists) {
      throw new HttpException(
        'Esse nome de modelo já está em uso',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateBrand(brand_id: string): Promise<void> {
    const brand = await this.brandModel.findByPk(brand_id);

    if (!brand) {
      throw new HttpException('Marca não encontrada', HttpStatus.BAD_REQUEST);
    }
  }
}
