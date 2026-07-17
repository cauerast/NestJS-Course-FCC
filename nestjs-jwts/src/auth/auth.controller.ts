import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';
import { RtGuard } from '../common/guards/index';
import { getCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { getCurrentUser } from '../common/decorators/get-current-user.decorator';
import { Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(authDto);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  login(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.login(authDto);
  }

  // @UseGuards(AtGuard) - dont need to use because atGuard is set to be global (main.ts)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public() // this route must to be public, so we dont need to pass the AT, only the RT to refresh
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
