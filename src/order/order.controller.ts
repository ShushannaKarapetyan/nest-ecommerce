import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  /**
   * Get all orders
   *
   * @param userId
   */
  @Auth()
  @Get()
  async getAll(@CurrentUser('id') userId: number): Promise<Order[]> {
    return this.orderService.getAll(userId);
  }
}
