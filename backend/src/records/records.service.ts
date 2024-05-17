import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from './record.entity';
import { DailyRecord } from './daily-record.entity';
import { RecordDto } from './record.dto';
import { CommentDto } from './comment.dto';


@Injectable()
export class RecordsService {

	constructor(
    	@InjectRepository(Record)
    	private readonly recordRepository: Repository<Record>,
    	@InjectRepository(DailyRecord)
    	private readonly dailyRecordRepository: Repository<DailyRecord>,
  	) {}

  	async record(userNo: DailyRecord['userNo'])
  	: Promise<{stopTime:DailyRecord['stopTime']} | {startTime:DailyRecord['startTime']}>{ 
  		const dailyRecord = await this.dailyRecordRepository.findOne({where:{userNo}});
  		const now = Date.now();

  		if (!dailyRecord || dailyRecord.stopTime >= dailyRecord.startTime) {

  			await this.dailyRecordRepository.save({userNo, startTime: now});
  			return {startTime: now};

  		}else {

  			await this.dailyRecordRepository.save({userNo, stopTime: now});
  			const minuteTime = Math.round((now - dailyRecord.startTime) / 60000);

  			//UTCの時間に9時間足して getUTC* で日本時間をとる
  			const startDate = new Date(dailyRecord.startTime + 540 * 60000);
  			const year = startDate.getUTCFullYear();
  			const month = startDate.getUTCMonth() + 1;
  			const day = startDate.getUTCDate();
  			let record = await this.recordRepository.findOne({where:{userNo, year, month, day}});
  			if (!record) {
  				await this.recordRepository.save({userNo, year, month, day, minuteTime});
  			}else {
  				record.minuteTime += minuteTime;
  				await this.recordRepository.save(record);
  			}

  			return {stopTime: now};
  		}
  	}

  	async getRecordState(userNo: DailyRecord['userNo']) {
  		return this.dailyRecordRepository.findOne({
  			select: ['startTime', 'stopTime'],
  			where: {userNo}
  		});
  	}

  	async getRecords(
  		userNo: Record['userNo'],
  		year: Record['year'] | undefined,
  		month: Record['month'] | undefined,
  		day: Record['day'] | undefined,
  	): Promise<Record[] | Record> {
  		let cond: any = {userNo};
  		if (year) cond.year = year;
		if (month) cond.month = month;
		if (day) cond.day = day;

  		return this.recordRepository.find({
  			where: cond
  		});
  	}

  	async getMinuteTimes(
  		userNo: Record['userNo'],
  		year: Record['year'] | undefined,
  		month: Record['month'] | undefined,
  		day: Record['day'] | undefined,
  	): Promise<Record[] | Record> {
  		let cond: any = {userNo};
  		if (year) cond.year = year;
		if (month) cond.month = month;
		if (day) cond.day = day;

  		return this.recordRepository.find({
  			select:['year','month','day','minuteTime'],
  			where: cond
  		});
  	}

  	async getComments(
  		userNo: Record['userNo'],
  		year: Record['year'] | undefined,
  		month: Record['month'] | undefined,
  		day: Record['day'] | undefined,
  	): Promise<Record[] | Record> {
  		let cond: any = {userNo};
  		if (year) cond.year = year;
		if (month) cond.month = month;
		if (day) cond.day = day;

  		return this.recordRepository.find({
  			select:['year','month','day','comment'],
  			where: cond
  		});
  	}

  	async registerRecord(
  		recordDto: RecordDto
  	): Promise<void> {
  		await this.recordRepository.save(recordDto);
  		return;
  	}

  	async registerComment(
  		commentDto: CommentDto
  	): Promise<void> {
  		await this.recordRepository.save(commentDto);
  		return;
  	}


}
