import {
	Controller, 
	Body, 
	Get,
	Post, 
	Put,
	UseGuards, 
	Request
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { SignupDto, PutPasswordDto } from './users.dto';


@Controller()
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('signup')
  	async signup(@Body() dto: SignupDto) {
  		return this.usersService.signup(dto);
  	}

  	@Put('/account/password')
  	@UseGuards(AuthGuard('jwt'))
  	async putPassword(@Body() dto: PutPasswordDto, @Request() req: any) {
  		return this.usersService.updatePassword(req.user.username, dto);
  	}

	@Get('/account/profile')
  	@UseGuards(AuthGuard('jwt'))
  	async getJwt(@Request() req: any) {
  		return req.user;
  	}
}
