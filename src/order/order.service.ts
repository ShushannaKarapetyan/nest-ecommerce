import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get all orders
   *
   * @param userId
   */
  async getAll(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
