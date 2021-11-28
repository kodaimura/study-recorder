import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Skill } from './skill.entity';
import { SkillCategory } from './skillCategory.entity';
import { SkillDto } from './skill.dto';
import { SkillCategoryDto } from './skillCategory.dto';


@Injectable()
export class SkillsService {

	constructor(
    	@InjectRepository(Skill)
    	private readonly skillRepository: Repository<Skill>,
    	@InjectRepository(SkillCategory)
    	private readonly skillCategoryRepository: Repository<SkillCategory>,
  	) {}

  	async getSkills(
  		userNo: Skill['userNo'],
  		categoryId: Skill['categoryId'] | undefined
  	): Promise<Skill[]> {
  		let cond: any = {userNo};
  		if (categoryId) cond.categoryId = categoryId;

  		return this.skillRepository.find({
  			select:['skillNo', 'categoryId', 'item1', 'item2', 'comment'],
  			where: cond
  		});
  	}

  	async getSkillCategories(
  		userNo: Skill['userNo'],
  		categoryId: Skill['categoryId'] | undefined
  	): Promise<SkillCategory[]> {
  		let cond: any = {userNo};
  		if (categoryId) cond.categoryId = categoryId;

  		return this.skillCategoryRepository.find({
  			select:['categoryId', 'categoryName'],
  			where: cond
  		});
  	}

  	async registerSkill(
  		skillDto: SkillDto
  	): Promise<void> {
  		await this.skillRepository.save(skillDto);
  		return;
  	}

  	async registerSkillCategory(
  		skillCategoryDto: SkillCategoryDto
  	): Promise<void> {
  		await this.skillCategoryRepository.save(skillCategoryDto);
  		return;
  	}


  	async deleteSkill(
  		userNo: Skill['userNo'],
  		skillNo: string
  	): Promise<void> {

  		await this.skillRepository.delete({
  			skillNo: parseInt(skillNo), userNo
  		});
  		return;
  	}


  	async deleteSkillCategory(
  		userNo: SkillCategory['userNo'],
  		categoryId: string
  	): Promise<void> {
  		await this.skillCategoryRepository.delete({
  			categoryId: parseInt(categoryId), userNo
  		});

  		await this.skillRepository.delete({
  			categoryId: parseInt(categoryId), userNo
  		});
  		return;
  	}

}
