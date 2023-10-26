import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from './enums/role-enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  /**
   * Get roles
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAll() {
    return this.roleService.getAll();
  }

  /**
   * Create a role
   *
   * @param dto
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(dto);
  }
}
