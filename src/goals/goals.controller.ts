import { 
	Controller, 
	Request,
	Param,
	Query,
	Headers,
	Body, 
	Get, 
	Post, 
	UseGuards,
	ParseIntPipe,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { MonthPipe, YearPipe } from '../app.pipe';
import { GoalService } from './goals.service';
import { GoalForYearDto } from './goalForYear.dto';
import { GoalForMonthDto } from './goalForMonth.dto';


@Controller('api/goals')
export class GoalController {

	constructor(private goalService: GoalService) {}

	@Get('year')
	@UseGuards(AuthGuard('jwt'))
	async getGoalForYear(
		@Query('year', YearPipe) year, 
		@Request() req,
	) {
		return this.goalService.getGoalForYear(req.user.userNo, year);
	}

	@Get('month')
	@UseGuards(AuthGuard('jwt'))
	async getGoalForMonth(
		@Query('year', YearPipe) year, 
		@Query('month', MonthPipe) month, 
		@Request() req,
	) {
		return this.goalService.getGoalForMonth(
			req.user.userNo, year, month
		);
	}

	@Post('year')
	@UseGuards(AuthGuard('jwt'))
	async registerGoalForYear(
		@Request() req,
		@Body() goalForYearDto: GoalForYearDto,
	) {
		goalForYearDto.userNo = req.user.userNo;
		return this.goalService.registerGoalForYear(goalForYearDto);
	}

	@Post('month')
	@UseGuards(AuthGuard('jwt'))
	async registerGoalForMonth(
		@Request() req,
		@Body() goalForMonthDto: GoalForMonthDto,
	) {
		goalForMonthDto.userNo = req.user.userNo;
		return this.goalService.registerGoalForMonth(goalForMonthDto);
	}
}
