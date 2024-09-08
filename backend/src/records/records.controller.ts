import { 
	Controller, 
	Request,
	Query,
	Body, 
	Get, 
	Post, 
	UseGuards,
	HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Payload  } from 'src/auth/auth.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';
import { MonthPipe, YearPipe } from 'src/app.pipe';

import { RecordsService } from './records.service';
import { RecordDto, RecordWorkDto } from './record.dto';


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
	@HttpCode(204)
	async postRecords(
		@Body() dto: RecordDto, 
		@Payload() pl: JwtPayload
	) {
		dto.userId = pl.userId;
		this.recordsService.registerRecord(dto);
	} 

	@Post('record')
	@UseGuards(AuthGuard('jwt'))
	async record(
		@Body() dto: RecordWorkDto, 
		@Payload() pl: JwtPayload
	) {
		dto.userId = pl.userId;
		return this.recordsService.record(dto);
	} 

	@Get('record/started_at')
	@UseGuards(AuthGuard('jwt'))
	async getWork(@Payload() pl: JwtPayload) {
		const startedAt: Date | null = await this.recordsService.getStartedAt(pl.userId);
		return { startedAt: startedAt };
	}
}
