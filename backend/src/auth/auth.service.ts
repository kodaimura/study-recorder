import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';


export type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	){}

	//認証処理
	async validateUser(username: string, password: string): Promise<PasswordOmitUser | null> {
		const user = await this.usersService.getByUsername(username);
    	if (user && user.password === this.usersService.hashPassword(password)) {
      		const { password, ...result } = user;
      		return result;
    	}

    	return null;
  	}

  	//jwtを返す
  	async login(user: PasswordOmitUser) {
    	const payload = { userNo: user.userNo, username: user.username };
    	return {
      		access_token: this.jwtService.sign(payload),
    	};
  	}

}