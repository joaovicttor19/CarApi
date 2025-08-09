import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, {
    message: 'Placa no formato inválido',
  })
  plate: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @Matches(/^\d{4}$/, { message: 'Ano deve ter 4 dígitos' })
  yearOfManufacture: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  mileage: number;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  id_model: string;
}
