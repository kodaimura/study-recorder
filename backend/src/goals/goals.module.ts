import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { MonthlyGoal } from './monthly-goal.entity';


@Module({
    imports: [TypeOrmModule.forFeature([MonthlyGoal])],
    providers: [GoalsService],
    controllers: [GoalsController]
})

export class GoalsModule { }
