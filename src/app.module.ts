import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoalForMonth } from './goals/goalForMonth.entity';
import { GoalForYear } from './goals/goalForYear.entity';
import { GoalModule } from './goals/goals.module';
import { RecordModule } from './records/records.module';
import { Record } from './records/record.entity';
import { DailyRecord } from './records/dailyRecord.entity';


@Module({
  	imports: [
  		ConfigModule.forRoot({
  			isGlobal: true,
      		envFilePath: '.env'
  		}),
    	AuthModule, 
    	UsersModule,
    	GoalModule,
    	TypeOrmModule.forRoot({
      		type: 'sqlite',
      		database: 'study-recorder.sqlite3',
      		synchronize: true,  
      		entities: [User, GoalForMonth, GoalForYear, Record, DailyRecord],
    	}),
    	RecordModule,
  	],
  	controllers: [AppController],
  	providers: [AppService],
})

export class AppModule {}
