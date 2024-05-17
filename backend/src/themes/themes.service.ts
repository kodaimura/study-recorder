import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ThemeForYear } from './theme-for-year.entity';
import { ThemeForMonth } from './theme-for-month.entity';
import { ThemeForYearDto } from './theme-for-year.dto';
import { ThemeForMonthDto } from './theme-for-month.dto';


@Injectable()
export class ThemesService {

	constructor(
    	@InjectRepository(ThemeForYear)
    	private readonly gfYearRepository: Repository<ThemeForYear>,
    	@InjectRepository(ThemeForMonth)
    	private readonly gfMonthRepository: Repository<ThemeForMonth>,
  	) {}

	async getThemeForYear(
		userNo: ThemeForYear['userNo'], 
		year: ThemeForYear['year']
	): Promise<ThemeForYear[] | ThemeForYear | undefined> {
  		if (year){
  			return this.gfYearRepository.find({where:{userNo, year}});
  		}else {
  			return this.gfYearRepository.find({where:{userNo}});
  		}
  		
  	}

  	async getThemeForMonth(
  		userNo: ThemeForMonth['userNo'],
  		year: ThemeForMonth['year'] | undefined,
  		month: ThemeForMonth['month'] | undefined
  	): Promise<ThemeForYear[] | ThemeForYear | undefined> {
  		let cond: any = {userNo};
		if (year) cond.year = year;
		if (month) cond.month = month;
		
		return this.gfMonthRepository.find({where: cond});
  		
  	}

  	async registerThemeForYear(themeForYearDto: ThemeForYearDto)
  	: Promise<void> {
  		await this.gfYearRepository.save(themeForYearDto);
  		return;
  	}

  	async registerThemeForMonth(themeForMonthDto: ThemeForMonthDto)
  	: Promise<void> {
  		await this.gfMonthRepository.save(themeForMonthDto);
  		return;
  	}
}
