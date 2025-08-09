import { BelongsTo, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Brand } from '../brand/brand.entity';
import { CreateCarModelDto } from './dtos/create-car-model.dto';
import { Vehicle } from '../vehicle/vehicle.entity';

@Table({
  tableName: 'carmodel',
  timestamps: false,
})
export class CarModel extends Model<CarModel, CreateCarModelDto> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id_model: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  yearmanufacture: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  brand_id: string;

  @BelongsTo(() => Brand)
  brand: Brand;

  @HasMany(() => Vehicle)
  brands: Vehicle[];
}
