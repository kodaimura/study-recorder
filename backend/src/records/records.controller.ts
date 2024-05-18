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

	@Post('record')
	@UseGuards(AuthGuard('jwt'))
	async record(@Request() req: any) {
		return this.recordsService.record(req.user.userNo);
	} 

	@Get('state')
	@UseGuards(AuthGuard('jwt'))
	async getState(@Request() req: any) {
		return this.recordsService.getRecordState(req.user.userNo);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getRecords(
		@Query('year', YearPipe) year: number,
		@Query('month', MonthPipe) month: number,
		@Query('day', DayPipe) day: number,
		@Request() req: any
	) {
		return this.recordsService.getRecords(
			req.user.userNo, year, month, day
		);
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
}
