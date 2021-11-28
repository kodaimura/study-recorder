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

  		return this.usersService.signup(signUpDto);
  	}

  	@Post('changeprofile')
  	@UseGuards(AuthGuard('jwt'))
  	async changeProfile(
  		@Body() signUpDto: SignUpDto,
  		@Request() req
  	) {
  		if (signUpDto.password !== signUpDto.passwordConfirm) {
  			throw new BadRequestException();
  		}

  		delete signUpDto.passwordConfirm;
  		signUpDto.userNo = req.user.userNo;

  		return this.usersService.changeProfile(signUpDto);
  	}
}
