import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordController } from './records.controller';
import { RecordService } from './records.service';
import { Record } from './record.entity';
import { DailyRecord } from './dailyRecord.entity';


@Module({
  	imports: [TypeOrmModule.forFeature([Record, DailyRecord])], 
  	controllers: [RecordController],
  	providers: [RecordService]
})

export class RecordModule {}
