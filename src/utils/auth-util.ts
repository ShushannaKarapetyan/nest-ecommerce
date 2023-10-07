import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUtil {
  constructor(private readonly jwtService: JwtService) {
  }

  sign(data: object, options: object): string {
    return this.jwtService.sign(data, options);
  }

  async verify(refreshToken: string) {
    return await this.jwtService.verifyAsync(refreshToken);
  }
}
