import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [acces_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15, // 15 min
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7, // a week
        },
      ),
    ]);

    return {
      acces_token,
      refresh_token,
    };
  }

  async signupLocal(authDto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(authDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: authDto.email,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    return tokens;
  }

  signinLocal() {}

  logout() {}

  refreshToken() {}
}
