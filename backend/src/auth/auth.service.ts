import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { JwtPayload } from './jwt.payload';


export type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    //認証処理
    async validateUser(username: string, plainPassword: string): Promise<PasswordOmitUser | null> {
        const user = await this.usersService.getByUsername(username);
        const passwordType = user ? await this.usersService.verifyPassword(plainPassword, user.password) : null;
        if (user && passwordType) {
            if (passwordType === 'legacy') {
                user.password = await this.usersService.hashPassword(plainPassword);
                await this.usersService.save(user);
            }
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    //jwtを返す
    async login(user: PasswordOmitUser) {
        const payload: JwtPayload = { userId: user.userId, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
