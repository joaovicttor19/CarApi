import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../brand/brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { User } from '../user/user.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private readonly brandModel: typeof Brand,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    await this.validateName(createBrandDto.name);
    const createBrand = await this.brandModel.create(createBrandDto);
    return createBrand;
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.findAll();
  }

  async findOne(brand_id: string): Promise<Brand> {
    const brand = await this.brandModel.findByPk(brand_id);

    if (!brand) {
      throw new HttpException('Marca não encontrada', HttpStatus.NOT_FOUND);
    }

    return brand;
  }

  async findByUser(user_id: string): Promise<Brand[]> {
    await this.validateUser(user_id);

    return await this.brandModel.findAll({
      where: { user_id },
    });
  }

  async update(brand_id: string, updateBrandDto: UpdateBrandDto) {
    if (updateBrandDto.name) {
      await this.validateName(updateBrandDto.name);
    }

    const updatedBand = await this.brandModel.update(
      { ...updateBrandDto },
      { where: { brand_id: brand_id }, returning: true },
    );

    return updatedBand[1][0];
  }

  async delete(brand_id: string) {
    const brand = await this.findOne(brand_id);
    await brand.destroy();
    return { message: 'Marca excluída com sucesso' };
  }

  async validateName(name: string) {
    const brandAlreadyExists = await this.brandModel.findOne({
      where: { name: name },
    });

    if (brandAlreadyExists) {
      throw new HttpException(
        'Esse nome já está em uso',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  async validateUser(user_id: string) {
    const user = await this.userModel.findByPk(user_id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
  }
}
