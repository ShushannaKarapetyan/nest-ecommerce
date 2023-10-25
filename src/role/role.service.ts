import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get roles
   */
  async getAll() {
    // return this.prisma.role.findMany({
    //   where: {
    //     users: {
    //       some: {
    //         user: {
    //           id: 3,
    //         },
    //       },
    //     }
    //   }
    // });

    return this.prisma.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Create a role
   *
   * @param dto
   */
  async create(dto: CreateRoleDto): Promise<RoleDto> {
    const role = await this.prisma.role.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (role) throw new BadRequestException('Role already exists.');

    return this.prisma.role.create({
      data: dto,
      select: {
        id: true,
        name: true,
      },
    });
  }
}
