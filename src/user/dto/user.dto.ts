import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '../../role/enums/role-enum';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  avatarPath: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsArray()
  roles: number[];
}