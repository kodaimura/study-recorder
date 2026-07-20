import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from './record.entity';
import { RecordWork } from './record-work.entity';
import { RecordDto, RecordWorkDto } from './record.dto';

type LocalDateParts = {
    year: number;
    month: number;
    day: number;
};

const getOffsetMinutes = (value: string): number => {
    if (value.endsWith('Z')) return 0;
    const match = value.match(/([+-])(\d{2}):?(\d{2})$/);
    if (!match) return -new Date().getTimezoneOffset();

    const sign = match[1] === '+' ? 1 : -1;
    return sign * (Number(match[2]) * 60 + Number(match[3]));
};

const getLocalDateParts = (date: Date, offsetMinutes: number): LocalDateParts => {
    const localDate = new Date(date.getTime() + offsetMinutes * 60000);
    return {
        year: localDate.getUTCFullYear(),
        month: localDate.getUTCMonth() + 1,
        day: localDate.getUTCDate(),
    };
};

const getNextLocalMidnight = (date: Date, offsetMinutes: number): Date => {
    const parts = getLocalDateParts(date, offsetMinutes);
    const nextMidnightUtc = Date.UTC(parts.year, parts.month - 1, parts.day + 1) - offsetMinutes * 60000;
    return new Date(nextMidnightUtc);
};

const splitByLocalDay = (startedAt: Date, endedAt: Date, offsetMinutes: number): Array<LocalDateParts & { minuteTime: number }> => {
    const segments: Array<LocalDateParts & { minuteTime: number }> = [];
    let cursor = new Date(startedAt);

    while (cursor.getTime() < endedAt.getTime()) {
        const nextMidnight = getNextLocalMidnight(cursor, offsetMinutes);
        const segmentEnd = nextMidnight.getTime() < endedAt.getTime() ? nextMidnight : endedAt;
        const minuteTime = Math.round((segmentEnd.getTime() - cursor.getTime()) / 60000);

        if (minuteTime > 0) {
            segments.push({
                ...getLocalDateParts(cursor, offsetMinutes),
                minuteTime,
            });
        }

        cursor = segmentEnd;
    }

    return segments;
};


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
        const offsetMinutes = getOffsetMinutes(dto.localeTime);
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

            if (requestedAt.getTime() < startedAt.getTime()) {
                throw new BadRequestException('localeTime must be after startedAt');
            }

            await workRepository.save({ userId, startedAt: null });
            const segments = splitByLocalDay(startedAt, requestedAt, offsetMinutes);

            for (const segment of segments) {
                const { year, month, day, minuteTime } = segment;
                const record = await recordRepository.findOne({ where: { userId, year, month, day } });

                if (record) {
                    record.minuteTime += minuteTime;
                    await recordRepository.save(record);
                } else {
                    const recordDto: RecordDto = { userId, year, month, day, minuteTime, comment: '' };
                    await recordRepository.save(recordDto);
                }
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
