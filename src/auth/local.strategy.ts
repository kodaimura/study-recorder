import { Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '../users/user.entity';
import { AuthService, PasswordOmitUser } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  	constructor(private authService: AuthService) {
    	//LocalStrategy デフォルトではusernameとpasswordを使う認証
    	//username ->userId
    	super({ usernameField: "userId" });
  	}

  	//認証
  	async validate(userId: User['userId'], password: User['password'])
  	: Promise<PasswordOmitUser> {
    	const user = await this.authService.validateUser(userId, password);
    	if (!user) {
      		throw new UnauthorizedException();
    	}
    	return user;
  	}
}