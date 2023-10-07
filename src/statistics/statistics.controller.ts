import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {
  }

  /**
   * Get user statistics
   *
   * @param userId
   */
  @Auth()
  @Get(':userId')
  async getStatistics(@Param('userId') userId: number) {
    return this.statisticsService.getStatistics(+userId);
  }
}
