import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { DatabaseModule } from './database/database.module';
import { BrandModule } from './modules/brand/brand.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middlewares';
import { BodyFormatingMiddleware } from './shared/middlewares/BodyFormatting.middlewares';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    CarModelModule,
    BrandModule,
    VehicleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(BodyFormatingMiddleware).forRoutes('*');
  }
}
