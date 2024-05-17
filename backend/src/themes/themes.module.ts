import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { ThemeForMonth } from './theme-for-month.entity'
import { ThemeForYear } from './theme-for-year.entity'


@Module({
	imports: [TypeOrmModule.forFeature([ThemeForMonth, ThemeForYear])], 
	providers: [ThemesService],
  	controllers: [ThemesController]
})

export class ThemesModule {}
