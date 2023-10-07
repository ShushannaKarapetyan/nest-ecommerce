import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetProductsDto) {
    return this.productService.getAll(queryDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(+id);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
