import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './theme.entity'


@Module({
	imports: [TypeOrmModule.forFeature([Theme])], 
	providers: [ThemesService],
  	controllers: [ThemesController]
})

export class ThemesModule {}
