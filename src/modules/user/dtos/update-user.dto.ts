import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  user_id?: string;
  username?: string;
  password?: string;
  email?: string;
  active?: boolean;
}
