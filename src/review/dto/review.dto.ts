import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsString()
  text: string;
}