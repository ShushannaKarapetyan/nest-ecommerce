import { IsNumber } from 'class-validator';

export class GetPaginationDto {
  @IsNumber()
  perPage: number;

  @IsNumber()
  skip: number;
}