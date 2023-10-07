import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { User } from '@prisma/client';
import { AuthUtil } from '../utils/auth-util';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private authUtil: AuthUtil) {
  }

  async register(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new BadRequestException('User already exists.');

    const newUser = await this.prisma.user.create({
      data: {
        name: faker.person.firstName(),
        email: dto.email,
        phone: faker.phone.number(),
        avatarPath: faker.image.avatar(),
        password: await hash(dto.password),
      },
    });

    const tokens = await this.generateTokens(newUser.id);

    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = await this.authUtil.verify(dto.refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token.');

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async generateTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.authUtil.sign(data, { expiresIn: '1h' });
    const refreshToken = this.authUtil.sign(data, { expiresIn: '3d' });

    return { accessToken, refreshToken };
  }

  // TODO: try to create type or interface
  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found.');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password.');

    return user;
  }
}
