import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
