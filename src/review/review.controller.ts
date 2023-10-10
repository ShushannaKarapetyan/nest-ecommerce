import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { Review } from '@prisma/client';
import { AverageDto } from './dto/average.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {
  }

  /**
   * Get all reviews
   */
  @Get()
  async getAll(): Promise<GetReviewsDto[]> {
    return this.reviewService.getAll();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post('leave-review/:productId')
  async leaveReview(@CurrentUser('id') userId: number,
                    @Param('productId') productId: string,
                    @Body() dto: ReviewDto): Promise<Review> {
    return this.reviewService.create(userId, +productId, dto);
  }

  @Get('average/:id')
  async getAverageByProductId(@Param('id') id: string): Promise<AverageDto> {
    return this.reviewService.getAverageByProductId(+id);
  }
}
