import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
// import { IStatistics } from './interface/statistics.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) {
  }

  /**
   * Get user statistics
   *
   * @param userId
   */
  async getStatistics(userId: number) {
    const user = await this.userService.getById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });

    const query = Prisma.sql`SELECT SUM(oi.price) AS deepSum
                             FROM order_items oi
                                      JOIN orders o ON oi.order_id = o.id
                             WHERE o."userId" = ?`;

    const result = await this.prismaService.$queryRaw(query, [user.id]);
    const totalAmount = result[0]?.deepsum || 0;

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Total amount',
        value: totalAmount,
      },
    ];
  }
}
