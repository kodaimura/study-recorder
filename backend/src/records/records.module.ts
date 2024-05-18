import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { RecordWork } from './record-work.entity';


@Module({
  	imports: [TypeOrmModule.forFeature([Record, RecordWork])], 
  	controllers: [RecordsController],
  	providers: [RecordsService]
})

export class RecordsModule {}
