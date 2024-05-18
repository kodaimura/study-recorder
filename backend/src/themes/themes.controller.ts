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

import { ThemesService } from './themes.service';
import { ThemeDto } from './theme.dto';


@Controller('themes')
export class ThemesController {

	constructor(private themesService: ThemesService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getThemes(
		@Query('year') year: number, 
		@Query('month') month: number, 
		@Request() req: any,
	) {
		return this.themesService.getThemes(
			req.user.userNo, year, month
		);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postTheme(
		@Request() req: any,
		@Body() dto: ThemeDto,
	) {
		dto.userNo = req.user.userNo;
		return this.themesService.registerTheme(dto);
	}
}
