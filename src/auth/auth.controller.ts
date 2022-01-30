import { Controller, Request, Get, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';


@Controller()
export class AuthController {

	constructor(private authService: AuthService) {}

  	//LocalStrategyのvalidateの戻り値がreqに入る
  	@Post('login')
  	@UseGuards(AuthGuard('local'))
  	async login(@Request() req) {
  		return this.authService.login(req.user);
  	}

  	@Get('profile')
  	@UseGuards(AuthGuard('jwt'))
  	async getJwt(@Request() req) {
  		return req.user;
  	}
}
