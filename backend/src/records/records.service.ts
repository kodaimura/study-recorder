import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from './record.entity';
import { RecordWork } from './record-work.entity';
import { RecordDto } from './record.dto';


@Injectable()
export class RecordsService {

	constructor(
    	@InjectRepository(Record)
    	private readonly recordRepository: Repository<Record>,
    	@InjectRepository(RecordWork)
    	private readonly recordWorkRepository: Repository<RecordWork>,
  	) {}

  	async record(userId: number): Promise<{[key:string]:number}> { 
  		const startTime = await this.getStartTime(userId);
  		const now = Date.now();

  		if (startTime === 0) {
			this.recordWorkRepository.save({userId, startTime: now.toString()});
  			return { startTime : now };
  		} else {
			await this.recordWorkRepository.save({userId, startTime: '0'});
			const minuteTime = Math.round((now - startTime) / 60000);
  
			//UTCの時間に9時間足して getUTC* で日本時間をとる
			const startDate = new Date(startTime + 540 * 60000);
			const year = startDate.getUTCFullYear();
			const month = startDate.getUTCMonth() + 1;
			const day = startDate.getUTCDate();
			this.getRecord(userId, year, month, day)
			.then((record: Record) => {
				if (record) {
					record.minuteTime += minuteTime;
					this.registerRecord(record);
				} else {
					const dto: RecordDto = { userId, year, month, day, minuteTime, comment: '' };
					this.registerRecord(dto);
				}
			});
			return { startTime : 0 };
  		}
  	}

  	async getStartTime(userId: number): Promise<number> {
  		const row = await this.recordWorkRepository.findOne({where: {userId}});
		return (row)? parseInt(row.startTime) : 0;
  	}

  	async getRecords(
  		userId: number,
  		year: number | undefined,
  		month: number | undefined,
  	): Promise<Record[]> {
  		let cond: any = {userId};
  		if (year) cond.year = year;
		if (month) cond.month = month;

  		return this.recordRepository.find({where: cond});
  	}

	async getRecord(
		userId: number,
		year: number,
		month: number,
		day: number,
	): Promise<Record> {
		return this.recordRepository.findOne({where:{userId, year, month, day}});
	}

  	async registerRecord(dto: RecordDto): Promise<void> {
  		await this.recordRepository.save(dto);
  		return;
  	}

}
