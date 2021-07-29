import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request & { user: User }) {
    const accessToken = await this.authService.getAccessToken(req.user);
    return { login: 'success', user: req.user, accessToken };
  }

  @Post('signup')
  async signup() {
    return { signup: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return { user: req.user };
  }
}
