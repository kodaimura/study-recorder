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

  	async record(userNo: number): Promise<{[key:string]:number | null}> { 
  		const recordWork = await this.recordWorkRepository.findOne({where:{userNo}});
  		const now = Date.now();

  		if (recordWork && recordWork.startTime) {
			await this.recordWorkRepository.save({userNo, startTime: null});
  			const minuteTime = Math.round((now - recordWork.startTime) / 60000);

  			//UTCの時間に9時間足して getUTC* で日本時間をとる
  			const startDate = new Date(recordWork.startTime + 540 * 60000);
  			const year = startDate.getUTCFullYear();
  			const month = startDate.getUTCMonth() + 1;
  			const day = startDate.getUTCDate();
  			this.getRecord(userNo, year, month, day)
			.then((record: Record) => {
				if (record) {
					record.minuteTime += minuteTime;
					this.registerRecord(record);
				} else {
					const dto: RecordDto = { userNo, year, month, day, minuteTime, comment: '' };
					this.registerRecord(dto);
				}
			});
  			return { startTime : null };

  		}else {
			this.recordWorkRepository.save({userNo, startTime: now});
  			return { startTime : now };
  		}
  	}

  	async getStartTime(userNo: number): Promise<{[key:string]:number | null}> {
  		const row = await this.recordWorkRepository.findOne({where: {userNo}});
		return { startTime : (row)? row.startTime : null };
  	}

  	async getRecords(
  		userNo: number,
  		year: number | undefined,
  		month: number | undefined,
  	): Promise<Record[]> {
  		let cond: any = {userNo};
  		if (year) cond.year = year;
		if (month) cond.month = month;

  		return this.recordRepository.find({where: cond});
  	}

	async getRecord(
		userNo: number,
		year: number,
		month: number,
		day: number,
	): Promise<Record> {
		return this.recordRepository.findOne({where:{userNo, year, month, day}});
	}

  	async registerRecord(dto: RecordDto): Promise<void> {
  		await this.recordRepository.save(dto);
  		return;
  	}

}
