import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnProductFullObject, returnProductObject } from './return-product.object';
import { ProductDto } from './dto/product.dto';
import { generateSlug } from '../utils/generate-slug';
import { GetProductsDto } from './dto/get-products.dto';
import { PaginationService } from '../pagination/pagination.service';
import { ProductSort } from './enums/product-sort';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService, private readonly paginationService: PaginationService) {
  }

  /**
   * Get all products
   */
  async getAll(dto: GetProductsDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    const sortMapping = {
      [ProductSort.HIGH_PRICE]: { price: 'desc' },
      [ProductSort.LOW_PRICE]: { price: 'asc' },
      [ProductSort.OLDEST]: { price: 'asc' },
    };

    prismaSort.push(sortMapping[sort] || { price: 'desc' });

    const prismaSearchTerm: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          category: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    } : {};

    const { perPage, skip } = this.paginationService.pagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTerm,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTerm,
      }),
    };
  }

  /**
   * Get product by id
   *
   * @param id
   */
  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: returnProductFullObject,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Get product by slug
   *
   * @param slug
   */
  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: returnProductFullObject,
    });

    console.log(product);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Get similar products
   *
   * @param id
   */
  async getSimilar(id: number) {
    const product = await this.getById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.findMany({
      where: {
        category: {
          name: product.category.name,
        },
        NOT: {
          id: product.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: returnProductObject,
    });
  }

  /**
   * Create product
   *
   * @param dto
   */
  async create(dto: ProductDto): Promise<Product> {
    const { name, description, price, quantity, images, categoryId } = dto;

    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        images,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  /**
   * Update product
   *
   * @param id
   * @param dto
   */
  async update(id: number, dto: ProductDto): Promise<Product> {
    const product = await this.getById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { name, description, price, quantity, images, categoryId } = dto;

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        quantity,
        images,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  /**
   * Delete product
   *
   * @param id
   */
  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
