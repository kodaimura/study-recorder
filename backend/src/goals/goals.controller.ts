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

import { GoalsService } from './goals.service';
import { MonthlyGoalDto } from './monthly-goal.dto';


@Controller('goals')
export class GoalsController {

    constructor(private goalsService: GoalsService) { }

    @Get('monthly')
    @UseGuards(AuthGuard('jwt'))
    async getMonthlyGoal(
        @Query('year', YearPipe) year: number,
        @Query('month', MonthPipe) month: number,
        @Payload() pl: JwtPayload
    ) {
        return this.goalsService.getMonthlyGoal(pl.userId, year, month);
    }

    @Post('monthly')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    async postMonthlyGoal(
        @Body() dto: MonthlyGoalDto,
        @Payload() pl: JwtPayload
    ) {
        dto.userId = pl.userId;
        await this.goalsService.registerMonthlyGoal(dto);
    }
}
