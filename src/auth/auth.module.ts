import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { config as dotenv } from 'dotenv';
import { JWTStrategy } from './jwt.strategy';

dotenv();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy,
  ],
  exports: [
    JWTStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
