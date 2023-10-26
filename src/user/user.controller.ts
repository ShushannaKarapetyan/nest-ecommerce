import { Body, Controller, Get, Param, Patch, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  /**
   * Get the profile data
   *
   * @param id
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(id);
  }

  /**
   * Update the profile
   *
   * @param id
   * @param dto
   */
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto): Promise<User> {
    return this.userService.updateProfile(id, dto);
  }

  /**
   * Toggle the favorite product
   *
   * @param productId
   * @param id
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('profile/favorites/:productId')
  async toggleFavorite(@Param('productId') productId: string,
                       @CurrentUser('id') id: number): Promise<{ message: string }> {
    return this.userService.toggleFavorite(id, +productId);
  }
}
