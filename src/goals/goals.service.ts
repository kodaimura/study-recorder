import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GoalForYear } from './goalForYear.entity';
import { GoalForMonth } from './goalForMonth.entity';
import { GoalForYearDto } from './goalForYear.dto';
import { GoalForMonthDto } from './goalForMonth.dto';


@Injectable()
export class GoalsService {

	constructor(
    	@InjectRepository(GoalForYear)
    	private readonly gfYearRepository: Repository<GoalForYear>,
    	@InjectRepository(GoalForMonth)
    	private readonly gfMonthRepository: Repository<GoalForMonth>,
  	) {}

	async getGoalForYear(
		userNo: GoalForYear['userNo'], 
		year: GoalForYear['year']
	): Promise<GoalForYear[] | GoalForYear | undefined> {
  		if (year){
  			return this.gfYearRepository.find({userNo, year});
  		}else {
  			return this.gfYearRepository.find({userNo});
  		}
  		
  	}

  	async getGoalForMonth(
  		userNo: GoalForMonth['userNo'],
  		year: GoalForMonth['year'] | undefined,
  		month: GoalForMonth['month'] | undefined
  	): Promise<GoalForYear[] | GoalForYear | undefined> {
  		let cond: any = {userNo};
		if (year) cond.year = year;
		if (month) cond.month = month;

  		if (Object.keys(cond).length === 3) {
  			return this.gfMonthRepository.find(cond);
  		} else {
  			return this.gfMonthRepository.find(cond);
  		}
  		
  	}

  	async registerGoalForYear(goalForYearDto: GoalForYearDto)
  	: Promise<void> {
  		await this.gfYearRepository.save(goalForYearDto);
  		return;
  	}

  	async registerGoalForMonth(goalForMonthDto: GoalForMonthDto)
  	: Promise<void> {
  		await this.gfMonthRepository.save(goalForMonthDto);
  		return;
  	}
}
