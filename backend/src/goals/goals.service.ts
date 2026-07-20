import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MonthlyGoal } from './monthly-goal.entity';
import { MonthlyGoalDto } from './monthly-goal.dto';


@Injectable()
export class GoalsService {

    constructor(
        @InjectRepository(MonthlyGoal)
        private readonly monthlyGoalRepository: Repository<MonthlyGoal>,
    ) { }

    async getMonthlyGoal(userId: number, year: number, month: number): Promise<MonthlyGoal> {
        const goal = await this.monthlyGoalRepository.findOne({ where: { userId, year, month } });
        return goal || this.monthlyGoalRepository.create({ userId, year, month, targetMinuteTime: 0 });
    }

    async registerMonthlyGoal(dto: MonthlyGoalDto): Promise<void> {
        await this.monthlyGoalRepository.save(dto);
        return;
    }
}
