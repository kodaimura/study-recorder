import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalService } from './goals.service';
import { GoalController } from './goals.controller';
import { GoalForMonth } from './goalForMonth.entity'
import { GoalForYear } from './goalForYear.entity'


@Module({
	imports: [TypeOrmModule.forFeature([GoalForMonth, GoalForYear])], 
	providers: [GoalService],
  	controllers: [GoalController]
})

export class GoalModule {}
