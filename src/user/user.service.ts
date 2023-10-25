import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';
import { returnUserObject } from './return-user.object';
import { hash } from 'argon2';
import { Prisma, User } from '@prisma/client';
import { Role } from './types/role';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get user by id
   *
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
        roles: {},
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

    // check if the roles exist with the given IDs
    const roleExists = await this.prisma.role.findMany({
      where: {
        id: {
          in: dto.roles,
        },
      },
    });

    if (!roleExists.length) {
      throw new BadRequestException('Roles are not found.');
    }

    const roles: Array<Role> = [];

    for (const role of roleExists) {
      roles.push({
        assignedBy: user.name,
        assignedAt: new Date(),
        roleId: role.id,
      });
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath ?? user.avatarPath,
        phone: dto.phone ?? user.phone,
        password: dto.password ? await hash(dto.password) : user.password,
        roles: {
          create: roles,
        },
      },
    });
  }

  /**
   * Toggle favorite product
   *
   * @param userId
   * @param productId
   */
  async toggleFavorite(userId: number, productId: number): Promise<{ message: string }> {
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
