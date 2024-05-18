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

import { DayPipe, MonthPipe, YearPipe } from '../app.pipe';
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
		@Request() req: any
	) {
		return this.recordsService.getRecords(req.user.userNo, year, month);
	} 

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postRecords(
		@Body() dto: RecordDto, 
		@Request() req: any
	) {
		dto.userNo = req.user.userNo;
		return this.recordsService.registerRecord(dto);
	} 

	@Post('record')
	@UseGuards(AuthGuard('jwt'))
	async record(@Request() req: any) {
		return this.recordsService.record(req.user.userNo);
	} 

	@Get('record/start_time')
	@UseGuards(AuthGuard('jwt'))
	async getWork(@Request() req: any) {
		return this.recordsService.getStartTime(req.user.userNo);
	}
}
