import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductsFilterDto } from './dto/products.filter.dto';
import { GetProductsDto } from './dto/get.products.dto';
import { SimilarProductsDto } from './dto/similar.products.dto';
import { Product } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role-enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  /**
   * Get all products
   */
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: ProductsFilterDto): Promise<GetProductsDto> {
    return this.productService.getAll(queryDto);
  }

  /**
   * Get product by id
   *
   * @param id
   */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(+id);
  }

  /**
   * Get product by slug
   *
   * @param slug
   */
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }

  /**
   * Get similar products
   *
   * @param id
   */
  @Get('similar/:id')
  async getSimilar(@Param('id') id: string): Promise<SimilarProductsDto[]> {
    return this.productService.getSimilar(+id);
  }

  /**
   * Create a product
   *
   * @param dto
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.create(dto);
  }

  /**
   * Update product
   *
   * @param id
   * @param dto
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto): Promise<Product> {
    return this.productService.update(+id, dto);
  }

  /**
   * Delete product
   *
   * @param id
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(+id);
  }
}
