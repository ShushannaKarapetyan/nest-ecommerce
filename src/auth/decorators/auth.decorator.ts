import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => {
  // console.log('1');
  return UseGuards(AuthGuard('jwt'));
}