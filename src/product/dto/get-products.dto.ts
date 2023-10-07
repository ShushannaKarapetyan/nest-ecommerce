import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { ProductSort } from '../enums/product-sort';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetProductsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSort)
  sort?: ProductSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}