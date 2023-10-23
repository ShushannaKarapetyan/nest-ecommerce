import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  /**
   * Get roles
   */
  @Auth()
  @Get()
  async getAll() {
    return this.roleService.getAll();
  }

  /**
   * Create a role
   *
   * @param dto
   */
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(dto);
  }
}
