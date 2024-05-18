import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from './record.entity';
import { RecordWork } from './record-work.entity';
import { RecordDto } from './record.dto';
import { CommentDto } from './comment.dto';


@Injectable()
export class RecordsService {

	constructor(
    	@InjectRepository(Record)
    	private readonly recordRepository: Repository<Record>,
    	@InjectRepository(RecordWork)
    	private readonly recordWorkRepository: Repository<RecordWork>,
  	) {}

  	async record(userNo: RecordWork['userNo'])
  	: Promise<{stopTime:RecordWork['stopTime']} | {startTime:RecordWork['startTime']}>{ 
  		const recordWork = await this.recordWorkRepository.findOne({where:{userNo}});
  		const now = Date.now();

  		if (!recordWork || recordWork.stopTime >= recordWork.startTime) {

  			await this.recordWorkRepository.save({userNo, startTime: now});
  			return {startTime: now};

  		}else {

  			await this.recordWorkRepository.save({userNo, stopTime: now});
  			const minuteTime = Math.round((now - recordWork.startTime) / 60000);

  			//UTCの時間に9時間足して getUTC* で日本時間をとる
  			const startDate = new Date(recordWork.startTime + 540 * 60000);
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

  	async getRecordState(userNo: RecordWork['userNo']) {
  		return this.recordWorkRepository.findOne({
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
