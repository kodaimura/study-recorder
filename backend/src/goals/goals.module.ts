import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { GoalForMonth } from './goalForMonth.entity'
import { GoalForYear } from './goalForYear.entity'


@Module({
	imports: [TypeOrmModule.forFeature([GoalForMonth, GoalForYear])], 
	providers: [GoalsService],
  	controllers: [GoalsController]
})

export class GoalsModule {}
