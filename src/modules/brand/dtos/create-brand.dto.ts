import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
