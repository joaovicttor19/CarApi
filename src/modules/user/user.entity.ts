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
  timestamps: true,
})
export class User extends Model<User, CreateUserDto> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare user_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  declare number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare active: boolean;

  @HasMany(() => Brand)
  declare brands: Brand[];
}
