import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { Review } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {
  }

  /**
   * Get all reviews
   */
  @Get()
  async getAll(): Promise<Review[]> {
    return this.reviewService.getAll();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('leave-review/:productId')
  async leaveReview(@CurrentUser('id') userId: number, @Param('productId') productId: string, @Body() dto: ReviewDto) {
    return this.reviewService.create(userId, +productId, dto);
  }
}
