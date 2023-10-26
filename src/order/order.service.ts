import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get orders of the logged-in user
   *
   * @param userId
   */
  async getByUserId(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get all orders
   *
   */
  async getAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
