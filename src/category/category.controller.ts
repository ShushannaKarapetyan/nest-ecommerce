import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';
import { GetCategoryDto } from './dto/get.category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  /**
   * Get all categories
   */
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  /**
   * Get all categories
   */
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetCategoryDto> {
    return this.categoryService.getById(+id);
  }

  /**
   * Create category
   *
   * @param dto
   */
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CategoryDto): Promise<Category> {
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
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CategoryDto): Promise<Category> {
    return this.categoryService.update(+id, dto);
  }

  /**
   * Delete category
   *
   * @param id
   */
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(+id);
  }
}
