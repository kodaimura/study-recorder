import { 
	Controller, 
	Request,
	Query,
	Body, 
	Get, 
	Post, 
	UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { Payload  } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
import { FriendsService } from './friends.service';


@Controller('friends')
export class FriendsController {

	constructor(private friendsService: FriendsService) {}
}
