import {
    Controller,
    Query,
    Body,
    Get,
    Post,
    UseGuards,
    HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Payload } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
import { MonthPipe, YearPipe } from 'src/app.pipe';

import { ThemesService } from './themes.service';
import { ThemeDto } from './theme.dto';


@Controller('themes')
export class ThemesController {

    constructor(private themesService: ThemesService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getThemes(
        @Query('year', YearPipe) year: number,
        @Query('month', MonthPipe) month: number,
        @Payload() pl: JwtPayload
    ) {
        return this.themesService.getThemes(pl.userId, year, month);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    async postTheme(
        @Body() dto: ThemeDto,
        @Payload() pl: JwtPayload
    ) {
        dto.userId = pl.userId;
        await this.themesService.registerTheme(dto);
    }
}
