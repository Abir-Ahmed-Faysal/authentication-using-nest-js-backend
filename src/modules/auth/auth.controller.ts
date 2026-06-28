import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: Request, @Headers('user-agent') userAgent?: string) {
    return this.authService.login(dto, userAgent, req.ip);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto, @Req() req: Request, @Headers('user-agent') userAgent?: string) {
    return this.authService.refresh(dto, userAgent, req.ip);
  }

  @Post('logout')
  logout(@Body('refreshToken') refreshToken?: string, @Req() req?: Request) {
    const userId = req?.headers['x-user-id'] as string | undefined;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.authService.logout(userId, refreshToken);
  }

  @Post('logout-all')
  logoutAll(@Req() req: Request) {
    const userId = req.headers['x-user-id'] as string | undefined;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.authService.logoutAll(userId);
  }

  @Get('profile')
  profile(@Req() req: Request) {
    const userId = req.headers['x-user-id'] as string | undefined;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.authService.profile(userId);
  }
}
