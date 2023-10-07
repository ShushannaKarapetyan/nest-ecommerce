import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { IStatistics } from './interface/statistics.interface';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {
  }

  /**
   * Get user statistics
   *
   * @param userId
   */
  async getStatistics(userId: number): Promise<IStatistics[]> {
    const user = await this.userService.getById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });

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
        value: 1000,   //TODO: write raw sql query to get total (orders[0].items[0].price)
      },
    ];
  }
}
