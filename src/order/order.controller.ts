import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Order } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role-enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  /**
   * Get orders of the logged-in user
   *
   * @param userId
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getByUserId(@CurrentUser('id') userId: number): Promise<Order[]> {
    return this.orderService.getByUserId(userId);
  }

  /**
   * Get all orders
   *
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }
}
