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

import { Payload } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
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
  	async putPassword(@Body() dto: PutPasswordDto, @Payload() pl: JwtPayload) {
  		return this.usersService.updatePassword(pl.username, dto);
  	}

	@Get('/account/profile')
  	@UseGuards(AuthGuard('jwt'))
  	async getJwt(@Payload() pl: JwtPayload) {
  		return {
			userId: pl.userId,
			username: pl.username
		};
  	}
}
