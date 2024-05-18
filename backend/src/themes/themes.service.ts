import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Theme } from './theme.entity';
import { ThemeDto } from './theme.dto';


@Injectable()
export class ThemesService {

	constructor(
    	@InjectRepository(Theme)
    	private readonly themeRepository: Repository<Theme>,
  	) {}

  	async getThemes(
  		userNo: number,
  		year: number | undefined,
  		month: number | undefined
  	): Promise<Theme[]> {
  		let cond: any = {userNo};
		if (year) cond.year = year;
		if (month) cond.month = month;
		
		return this.themeRepository.find({where: cond});
  	}

  	async registerTheme(dto: ThemeDto): Promise<void> {
  		await this.themeRepository.save(dto);
  		return;
  	}
}
