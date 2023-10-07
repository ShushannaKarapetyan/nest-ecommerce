import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  /**
   * Get all categories
   */
  @HttpCode(200)
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  /**
   * Get all categories
   */
  @Auth()
  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getById(+id);
  }

  /**
   * Create category
   *
   * @param dto
   */
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  /**
   * Update category
   *
   * @param id
   * @param dto
   */
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  /**
   * Delete category
   *
   * @param id
   */
  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(+id);
  }
}
