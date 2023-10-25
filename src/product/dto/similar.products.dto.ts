import { ArrayMinSize, IsDate, IsNumber, IsString } from 'class-validator';

export class SimilarProductsDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  description: string | null;

  @IsNumber()
  quantity: number;

  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];

  @IsString()
  slug: string;

  @IsDate()
  createdAt: Date;
}
