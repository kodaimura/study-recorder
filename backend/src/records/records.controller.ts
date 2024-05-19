import { 
	Controller, 
	Request,
	Query,
	Body, 
	Get, 
	Post, 
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Payload  } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
import { MonthPipe, YearPipe } from 'src/app.pipe';

import { RecordsService } from './records.service';
import { RecordDto } from './record.dto';


@Controller('records')
export class RecordsController {

	constructor(private recordsService: RecordsService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getRecords(
		@Query('year', YearPipe) year: number,
		@Query('month', MonthPipe) month: number,
		@Payload() pl: JwtPayload
	) {
		return this.recordsService.getRecords(pl.userId, year, month);
	} 

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postRecords(
		@Body() dto: RecordDto, 
		@Payload() pl: JwtPayload
	) {
		dto.userId = pl.userId;
		return this.recordsService.registerRecord(dto);
	} 

	@Post('record')
	@UseGuards(AuthGuard('jwt'))
	async record(@Payload() pl: JwtPayload) {
		return this.recordsService.record(pl.userId);
	} 

	@Get('record/start_time')
	@UseGuards(AuthGuard('jwt'))
	async getWork(@Payload() pl: JwtPayload) {
		const startTime: number = await this.recordsService.getStartTime(pl.userId);
		return { startTime: startTime };
	}
}
