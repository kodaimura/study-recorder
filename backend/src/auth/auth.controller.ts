import {
    Controller,
    Request,
    Response,
    Post,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response as ExpressResponse } from 'express';

import { AuthService } from './auth.service';

const REFRESH_COOKIE_NAME = 'study_recorder_refresh_token';
const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
        private config: ConfigService,
    ) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req: any, @Response({ passthrough: true }) res: ExpressResponse) {
        const data = await this.authService.login(req.user);
        res.cookie(REFRESH_COOKIE_NAME, data.refresh_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: this.config.get<string>('ENV') === 'production',
            maxAge: REFRESH_COOKIE_MAX_AGE,
            path: '/',
        });
        return { access_token: data.access_token };
    }

    @Post('refresh')
    async refresh(@Request() req: any) {
        const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        return this.authService.refreshAccessToken(refreshToken);
    }

    @Post('logout')
    logout(@Response({ passthrough: true }) res: ExpressResponse) {
        res.clearCookie(REFRESH_COOKIE_NAME, { path: '/' });
        return { ok: true };
    }
}
