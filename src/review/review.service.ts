import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReviewDto } from './dto/review.dto';
import { returnReviewObject } from './return-review.object';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { Review } from '@prisma/client';
import { AverageDto } from './dto/average.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Get all reviews
   */
  async getAll(): Promise<GetReviewsDto[]> {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });
  }

  /**
   * Create a review
   *
   * @param userId
   * @param productId
   * @param dto
   */
  async create(userId: number, productId: number, dto: ReviewDto): Promise<Review> {
    return this.prisma.review.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  /**
   * Get an average
   *
   * @param productId
   */
  async getAverageByProductId(productId: number): Promise<AverageDto> {
    return this.prisma.review.aggregate({
      where: {
        productId,
      },
      _avg: {
        rating: true,
      },
    }).then(data => data._avg);
  }
}
