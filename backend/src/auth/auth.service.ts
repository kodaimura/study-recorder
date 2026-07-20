import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { JwtPayload } from './jwt.payload';


export type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService,
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

    createAccessToken(user: PasswordOmitUser): string {
        const payload: JwtPayload = { userId: user.userId, username: user.username };
        return this.jwtService.sign(payload, {
            secret: this.config.get<string>('JWT_SECRET_KEY'),
            expiresIn: '15m',
        });
    }

    createRefreshToken(user: PasswordOmitUser): string {
        const payload = { userId: user.userId, username: user.username, tokenType: 'refresh' };
        return this.jwtService.sign(payload, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET_KEY'),
            expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d') as JwtSignOptions['expiresIn'],
        });
    }

    //jwtを返す
    async login(user: PasswordOmitUser) {
        return {
            access_token: this.createAccessToken(user),
            refresh_token: this.createRefreshToken(user),
        };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.config.get<string>('JWT_REFRESH_SECRET_KEY'),
            });

            if (payload.tokenType !== 'refresh') {
                throw new UnauthorizedException();
            }

            const user = await this.usersService.getById(payload.userId);
            if (!user) {
                throw new UnauthorizedException();
            }

            const { password, ...result } = user;
            return {
                access_token: this.createAccessToken(result),
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

}
