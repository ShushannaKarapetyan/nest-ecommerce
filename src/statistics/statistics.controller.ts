import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { StatisticsDto } from './dto/statistics.dto';

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
  async getStatistics(@Param('userId') userId: number): Promise<StatisticsDto[]> {
    return this.statisticsService.getStatistics(+userId);
  }
}
