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

  	async record(userNo: number): Promise<{[key:string]:number}>{ 
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

  	async getRecordWork(userNo: number): Promise<RecordWork> {
  		return this.recordWorkRepository.findOne({
  			select: ['startTime', 'stopTime'],
  			where: {userNo}
  		});
  	}

  	async getRecords(
  		userNo: number,
  		year: number | undefined,
  		month: number | undefined,
  		day: number | undefined,
  	): Promise<Record[]> {
  		let cond: any = {userNo};
  		if (year) cond.year = year;
		if (month) cond.month = month;
		if (day) cond.day = day;

  		return this.recordRepository.find({where: cond});
  	}

  	async registerRecord(dto: RecordDto): Promise<void> {
  		await this.recordRepository.save(dto);
  		return;
  	}

}
