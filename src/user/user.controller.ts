import { Body, Controller, Get, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto): Promise<User> {
    return this.userService.updateProfile(id, dto);
  }

  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(@Param('productId') productId: string,
                       @CurrentUser('id') id: number): Promise<{ message: string }> {
    return this.userService.toggleFavorite(id, +productId);
  }
}
