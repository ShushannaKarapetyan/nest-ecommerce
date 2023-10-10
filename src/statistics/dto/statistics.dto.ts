import { IsNumber, IsString } from 'class-validator';

export class StatisticsDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
