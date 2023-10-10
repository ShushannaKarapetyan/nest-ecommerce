import { RefreshTokenDto } from './refresh-token.dto';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserReturnDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
}

export class AuthReturnDto extends RefreshTokenDto {
  user: UserReturnDto;

  @IsString()
  accessToken: string;
}