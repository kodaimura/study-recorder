import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from './record.entity';
import { RecordWork } from './record-work.entity';
import { RecordDto, RecordWorkDto } from './record.dto';


@Injectable()
export class RecordsService {

	constructor(
    	@InjectRepository(Record)
    	private readonly recordRepository: Repository<Record>,
    	@InjectRepository(RecordWork)
    	private readonly recordWorkRepository: Repository<RecordWork>,
  	) {}

  	async record(dto: RecordWorkDto): Promise<{[key:string]: string | null}> { 
		const userId = dto.userId;
  		const startedAt = await this.getStartedAt(userId);

  		if (startedAt === null) {
			this.recordWorkRepository.save({userId, startedAt: dto.localeTime});
  			return { startedAt : dto.localeTime };
  		} else {
			await this.recordWorkRepository.save({userId, startedAt: null});
			const minuteTime = Math.round((new Date(dto.localeTime).getTime() - startedAt.getTime()) / 60000);
  
			const startDate = new Date(startedAt);
			const year = startDate.getFullYear();
			const month = startDate.getMonth() + 1;
			const day = startDate.getDate();
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
			return { startedAt : null };
  		}
  	}

  	async getStartedAt(userId: number): Promise<Date | null> {
  		const row = await this.recordWorkRepository.findOne({where: {userId}});
		return row ? row.startedAt : null;
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
