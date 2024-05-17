import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { DailyRecord } from './daily-record.entity';


@Module({
  	imports: [TypeOrmModule.forFeature([Record, DailyRecord])], 
  	controllers: [RecordsController],
  	providers: [RecordsService]
})

export class RecordsModule {}
