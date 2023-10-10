import { IsDate, IsNumber, IsString } from 'class-validator';
import { IUser } from '../../user/interfaces/user.interface';

export class GetReviewsDto {
  @IsNumber()
  id: number;

  @IsNumber()
  rating: number;

  @IsString()
  text: string;

  user: IUser;

  @IsDate()
  createdAt: Date;
}