import { IsNumber } from 'class-validator';

export class AverageDto {
  @IsNumber()
  rating: number;
}