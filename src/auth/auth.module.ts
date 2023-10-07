import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { AuthUtil } from '../utils/auth-util';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthUtil],
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig,
  })],
  exports: [AuthService],
})

export class AuthModule {
}
