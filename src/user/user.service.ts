import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';
import { returnUserObject } from './return-user.object';
import { hash } from 'argon2';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get user by id
   * @param id
   * @param selectObject
   */
  async getById(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            quantity: true,
          },
        },
        ...selectObject,
      },
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  /**
   * Update profile
   *
   * @param id
   * @param dto
   */
  async updateProfile(id: number, dto: UserDto): Promise<User> {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already in use.');

    const user = await this.getById(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  /**
   * Toggle favorite product
   *
   * @param userId
   * @param productId
   */
  async toggleFavorite(userId: number, productId: number) {
    const user = await this.getById(userId);

    if (!user) throw new NotFoundException('User not found.');

    const isExists = user.favorites.some(product => product.id === productId);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });

    return { message: 'Success' };
  }
}
