import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsDto } from './dto/statistics.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role-enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {
  }

  /**
   * Get user statistics
   *
   * @param userId
   */
  @Roles([RoleEnum.OWNER, RoleEnum.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':userId')
  async getStatistics(@Param('userId') userId: number): Promise<StatisticsDto[]> {
    return this.statisticsService.getStatistics(+userId);
  }
}
