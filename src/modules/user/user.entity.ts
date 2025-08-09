import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateUserDto } from './dtos/create-user.dto';
import { Brand } from '../brand/brand.entity';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, CreateUserDto> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public user_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @HasMany(() => Brand)
  brands: Brand[];
}
