import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnCategoryObject } from './return-category.object';
import { Category } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get all categories
   */
  async getAll(): Promise<Category[]> {
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
  async getById(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        ...returnCategoryObject,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return category;
  }

  /**
   * Create category
   *
   * @param dto
   */
  async create(dto: CategoryDto): Promise<Category> {
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
    return this.prisma.category.update({
      where: {
        id,
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
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}