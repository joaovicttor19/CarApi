import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(user: CreateUserDto): Promise<User> {
    await this.validateEmail(user.email);
    const createUser = await this.userModel.create(user);
    return createUser;
  }
  async findAll() {
    return await this.userModel.findAll();
  }
  async findOne(user_id: string): Promise<User> {
    const user = await this.userModel.findByPk(user_id);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async update(id: string, user: UpdateUserDto) {
    if (user.email) {
      await this.validateEmail(user.email);
    }

    const updatedUser = await this.userModel.update(
      { ...user },
      { where: { user_id: id }, returning: true },
    );

    return updatedUser[1][0];
  }

  async delete(user_id: string): Promise<{ message: string }> {
    const userModel = await this.findOne(user_id);
    await userModel.destroy();

    return { message: 'Modelo excluído com sucesso' };
  }

  async validateEmail(email: string) {
    const emailAlreadyExists = await this.userModel.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      throw new HttpException(
        'Esse email já está em uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
