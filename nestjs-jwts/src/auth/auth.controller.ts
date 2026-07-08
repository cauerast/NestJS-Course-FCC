import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  async signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signupLocal(authDto);
  }

  @Post('/local/signin')
  signinLocal() {
    return this.authService.signinLocal();
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
