import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'; // import Req to user Request (express);
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';
import type { Request } from 'express';
// import { jwtPayloadAt, jwtPayloadRt } from './types/jwt-payload.types';
import { RtGuard, AtGuard } from '../common/guards/index';
import { getCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { getCurrentUser } from '../common/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(authDto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  login(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.login(authDto);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @getCurrentUserId() userId: number,
    @getCurrentUser('refreshToken') userRt: string,
  ) {
    return this.authService.refreshToken(userId, userRt);
  }

  /* 
  Outra maneira de fazer a mesma requisicao sem os decorators 
  Request importado do express e jwtPayloadAt de './types/jwt-payload.types'

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user as jwtPayloadAt;
    return this.authService.logout(user.sub);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user as jwtPayloadRt;
    return this.authService.refreshToken(user.sub, user.refreshToken);
  }
  */
}
