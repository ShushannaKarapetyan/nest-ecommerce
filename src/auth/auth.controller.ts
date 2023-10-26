import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthReturnDto } from './dto/auth.return.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * User registration
   *
   * @param dto
   */
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto): Promise<AuthReturnDto> {
    return this.authService.register(dto);
  }

  /**
   * User login
   *
   * @param dto
   */
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<AuthReturnDto> {
    return this.authService.login(dto);
  }

  /**
   * Get new access and refresh tokens
   *
   * @param dto
   */
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto): Promise<AuthReturnDto> {
    return this.authService.getNewTokens(dto);
  }
}
