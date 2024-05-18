import { 
	Controller, 
	Query,
	Body, 
	Get, 
	Post, 
	UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { Payload } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
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
		@Payload() pl: JwtPayload
	) {
		return this.themesService.getThemes(
			pl.userId, year, month
		);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postTheme(
		@Body() dto: ThemeDto,
		@Payload() pl: JwtPayload
	) {
		dto.userId = pl.userId;
		return this.themesService.registerTheme(dto);
	}
}
