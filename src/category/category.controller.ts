import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';
import { GetCategoryDto } from './dto/get.category.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { RoleEnum } from '../role/enums/role-enum';
import { AuthGuard } from '@nestjs/passport';

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
  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetCategoryDto> {
    return this.categoryService.getById(+id);
  }

  /**
   * Create category
   *
   * @param dto
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(+id);
  }
}
