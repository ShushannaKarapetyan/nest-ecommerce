import { IsNumber, IsString } from 'class-validator';

export class RoleDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
