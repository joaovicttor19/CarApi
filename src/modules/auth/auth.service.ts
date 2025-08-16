import { BadRequestException, forwardRef, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user.entity';

dotenv.config();
@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {
    this.jwtExpirationTimeInSeconds = Number(process.env.JWT_EXPIRATION_TIME);
  }

  async signIn(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: { username: username },
    });

    if (!user || !bcryptCompareSync(password, user.dataValues.password)) {
      throw new BadRequestException('Username or password is incorrect');
    }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      token: token,
      userId: user.user_id,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
