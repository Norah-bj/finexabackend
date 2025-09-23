import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <- this sets the base path "/auth"
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // <- this is the "/auth/login" endpoint
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
