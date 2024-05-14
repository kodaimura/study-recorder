import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Skill } from './skill.entity';
import { SkillCategory } from './skillCategory.entity';


@Module({
  	imports: [TypeOrmModule.forFeature([Skill, SkillCategory])], 
  	controllers: [SkillsController],
  	providers: [SkillsService]
})
export class SkillsModule {}

