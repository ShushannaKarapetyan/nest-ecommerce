import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { returnUserObject } from '../../user/return-user.object';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ id }): Promise<Pick<User, 'id'>> {
    return this.prisma.user.findUnique({
      where: { id: +id },
      select: {
        ...returnUserObject,
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}