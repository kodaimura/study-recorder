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
import { GoalsModule } from './goals/goals.module';
import { RecordsModule } from './records/records.module';
import { Record } from './records/record.entity';
import { DailyRecord } from './records/dailyRecord.entity';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/skill.entity';
import { SkillCategory } from './skills/skillCategory.entity';


@Module({
  	imports: [
  		ConfigModule.forRoot({
  			isGlobal: true,
      		envFilePath: '.env'
  		}),
    	AuthModule, 
    	UsersModule,
    	GoalsModule,
    	TypeOrmModule.forRoot({
      		type: 'sqlite',
      		database: 'study-recorder.db',
      		synchronize: true,  
      		entities: [User, GoalForMonth, GoalForYear, Record, DailyRecord,
      					Skill, SkillCategory],
    	}),
    	RecordsModule,
    	SkillsModule,
  	],
  	controllers: [AppController],
  	providers: [AppService],
})

export class AppModule {}
