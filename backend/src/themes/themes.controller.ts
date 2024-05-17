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
import { ThemesService } from './themes.service';
import { ThemeForYearDto } from './theme-for-year.dto';
import { ThemeForMonthDto } from './theme-for-month.dto';


@Controller('themes')
export class ThemesController {

	constructor(private themesService: ThemesService) {}

	@Get('year')
	@UseGuards(AuthGuard('jwt'))
	async getThemeForYear(
		@Query('year', YearPipe) year, 
		@Request() req,
	) {
		return this.themesService.getThemeForYear(req.user.userNo, year);
	}

	@Get('month')
	@UseGuards(AuthGuard('jwt'))
	async getThemeForMonth(
		@Query('year', YearPipe) year, 
		@Query('month', MonthPipe) month, 
		@Request() req,
	) {
		return this.themesService.getThemeForMonth(
			req.user.userNo, year, month
		);
	}

	@Post('year')
	@UseGuards(AuthGuard('jwt'))
	async registerThemeForYear(
		@Request() req,
		@Body() themeForYearDto: ThemeForYearDto,
	) {
		themeForYearDto.userNo = req.user.userNo;
		return this.themesService.registerThemeForYear(themeForYearDto);
	}

	@Post('month')
	@UseGuards(AuthGuard('jwt'))
	async registerThemeForMonth(
		@Request() req,
		@Body() themeForMonthDto: ThemeForMonthDto,
	) {
		themeForMonthDto.userNo = req.user.userNo;
		return this.themesService.registerThemeForMonth(themeForMonthDto);
	}
}
