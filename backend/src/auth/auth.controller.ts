import {
    Controller,
    Request,
    Post,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';


@Controller()
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
