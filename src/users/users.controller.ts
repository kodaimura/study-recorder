import { Controller, Body, Post, BadRequestException } from '@nestjs/common';

import { UsersService } from './users.service';
import { SignUpDto } from './signUp.dto';


@Controller('api')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('signup')
  	async signup(@Body() signUpDto: SignUpDto) {
  		if (signUpDto.password !== signUpDto.passwordConfirm) {
  			throw new BadRequestException();
  		}

  		delete signUpDto.passwordConfirm;

  		return this.usersService.register(signUpDto);
  	}
}
