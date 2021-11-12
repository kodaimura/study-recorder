import { 
	Controller, 
	Request,
	Param,
	Query,
	Body, 
	Get, 
	Post, 
	UseGuards,
	ParseIntPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { DayPipe, MonthPipe, YearPipe } from '../app.pipe';
import { RecordService } from './records.service';
import { RecordDto } from './record.dto';
import { CommentDto } from './comment.dto';


@Controller('api/records')
export class RecordController {

	constructor(private recordService: RecordService) {}

	@Get('record')
	@UseGuards(AuthGuard('jwt'))
	async record(@Request() req) {
		return this.recordService.record(req.user.userNo);
	} 

	@Get('state')
	@UseGuards(AuthGuard('jwt'))
	async getState(@Request() req) {
		return this.recordService.getRecordState(req.user.userNo);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getRecords(
		@Query('year', YearPipe) year,
		@Query('month', MonthPipe) month,
		@Query('day', DayPipe) day,
		@Request() req
	) {
		return this.recordService.getRecords(
			req.user.userNo, year, month, day
		);
	} 

	@Get('minute-times')
	@UseGuards(AuthGuard('jwt'))
	async getMinuteTimes(
		@Query('year', YearPipe) year,
		@Query('month', MonthPipe) month,
		@Query('day', DayPipe) day,
		@Request() req
	) {
		return this.recordService.getMinuteTimes(
			req.user.userNo, year, month, day
		);
	} 

	@Get('comments')
	@UseGuards(AuthGuard('jwt'))
	async getComments(
		@Query('year', YearPipe) year,
		@Query('month', MonthPipe) month,
		@Query('day', DayPipe) day,
		@Request() req
	) {
		return this.recordService.getComments(
			req.user.userNo, year, month, day
		);
	} 

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async registerRecords(
		@Body() recordDto: RecordDto, 
		@Request() req
	) {
		recordDto.userNo = req.user.userNo;
		return this.recordService.registerRecord(
			recordDto
		);
	} 

	@Post('comments')
	@UseGuards(AuthGuard('jwt'))
	async registerComment(
		@Body() commentDto: CommentDto, 
		@Request() req
	) {
		commentDto.userNo = req.user.userNo;
		return this.recordService.registerComment(
			commentDto
		);
	}

}
