import { BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { User } from '../user/user.entity';

@Table({
  tableName: 'brand',
  timestamps: false,
})
export class Brand extends Model<Brand, CreateBrandDto> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public brand_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
