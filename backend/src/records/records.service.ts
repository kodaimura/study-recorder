import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
        private readonly dataSource: DataSource,
    ) { }

    async record(dto: RecordWorkDto): Promise<{ [key: string]: string | null }> {
        const userId = dto.userId;
        const requestedAt = new Date(dto.localeTime);
        if (Number.isNaN(requestedAt.getTime())) {
            throw new BadRequestException('Invalid localeTime');
        }

        return this.dataSource.transaction(async (manager) => {
            await manager.query('SELECT pg_advisory_xact_lock($1)', [userId]);

            const workRepository = manager.getRepository(RecordWork);
            const recordRepository = manager.getRepository(Record);
            const work = await workRepository.findOne({ where: { userId } });
            const startedAt = work?.startedAt ?? null;

            if (startedAt === null) {
                await workRepository.save({ userId, startedAt: requestedAt });
                return { startedAt: dto.localeTime };
            }

            const minuteTime = Math.round((requestedAt.getTime() - startedAt.getTime()) / 60000);
            if (minuteTime < 0) {
                throw new BadRequestException('localeTime must be after startedAt');
            }

            await workRepository.save({ userId, startedAt: null });

            const startDate = new Date(startedAt);
            const year = startDate.getFullYear();
            const month = startDate.getMonth() + 1;
            const day = startDate.getDate();
            const record = await recordRepository.findOne({ where: { userId, year, month, day } });

            if (record) {
                record.minuteTime += minuteTime;
                await recordRepository.save(record);
            } else {
                const recordDto: RecordDto = { userId, year, month, day, minuteTime, comment: '' };
                await recordRepository.save(recordDto);
            }

            return { startedAt: null };
        });
    }

    async getStartedAt(userId: number): Promise<Date | null> {
        const row = await this.recordWorkRepository.findOne({ where: { userId } });
        return row ? row.startedAt : null;
    }

    async getRecords(
        userId: number,
        year: number | undefined,
        month: number | undefined,
    ): Promise<Record[]> {
        let cond: any = { userId };
        if (year) cond.year = year;
        if (month) cond.month = month;

        return this.recordRepository.find({ where: cond });
    }

    async getRecord(
        userId: number,
        year: number,
        month: number,
        day: number,
    ): Promise<Record> {
        return this.recordRepository.findOne({ where: { userId, year, month, day } });
    }

    async registerRecord(dto: RecordDto): Promise<void> {
        await this.recordRepository.save(dto);
        return;
    }

}
