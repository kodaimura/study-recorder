import {
    Controller,
    Request,
    Response,
    Post,
    UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response as ExpressResponse } from 'express';

import { AuthService } from './auth.service';


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
        res.cookie('study_recorder_token', data.access_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: this.config.get<string>('ENV') === 'production',
            maxAge: 4 * 60 * 60 * 1000,
            path: '/',
        });
        return { ok: true };
    }

    @Post('logout')
    logout(@Response({ passthrough: true }) res: ExpressResponse) {
        res.clearCookie('study_recorder_token', { path: '/' });
        return { ok: true };
    }
}
