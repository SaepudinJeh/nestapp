import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { Auth, AuthModel } from './entities/auth.entity';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthModel }]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.SECRET_JWT,
          signOptions: {
            expiresIn: 60 * 10 * 24,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
