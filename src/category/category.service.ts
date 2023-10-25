import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnCategoryObject } from './return-category.object';
import { Category } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';
import { GetCategoryDto } from './dto/get.category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get all categories
   */
  async getAll(): Promise<GetCategoryDto[]> {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnCategoryObject,
    });
  }

  /**
   * Get category by id
   *
   * @param id
   */
  async getById(id: number): Promise<GetCategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    });

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  /**
   * Create category
   *
   * @param dto
   */
  async create(dto: CategoryDto): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (category) throw new BadRequestException('Category already exists.');

    return this.prisma.category.create({
      data: dto,
    });
  }

  /**
   * Update category
   *
   * @param id
   * @param dto
   */
  async update(id: number, dto: CategoryDto): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException('Category not found.');

    return this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: dto.name,
      },
    });
  }

  /**
   * Delete category
   *
   * @param id
   */
  async delete(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) throw new NotFoundException('Category not found.');

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
