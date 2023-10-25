import { Product } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class GetProductsDto {
  products: Product[] = [];

  @IsNumber()
  length: number;
}
