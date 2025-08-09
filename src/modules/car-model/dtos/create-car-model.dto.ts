import {
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateCarModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{4}$/, { message: 'Ano de fabricação deve ter 4 dígitos' })
  yearmanufacture: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'O preço deve ser maior que 0' })
  price: number;

  @IsNotEmpty()
  @IsUUID()
  brand_id: string;
}
