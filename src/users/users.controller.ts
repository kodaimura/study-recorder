import { 
	Request,
	Controller, 
	Body, 
	Post, 
	BadRequestException,
	UseGuards 
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { SignUpDto, ChangePasswordDto } from './users.dto';


@Controller()
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('signup')
  	async signup(@Body() signUpDto: SignUpDto) {
  		return this.usersService.signup(signUpDto);
  	}

  	@Post('passwordchange')
  	@UseGuards(AuthGuard('jwt'))
  	async changePassword(
  		@Body() changePasswordDto: ChangePasswordDto,
  		@Request() req
  	) {
  		return this.usersService.changePassword(req.user.username, changePasswordDto);
  	}
}
