import { 
	Controller, 
	Request,
	Param,
	Query,
	Headers,
	Body, 
	Get, 
	Post, 
	Delete,
	UseGuards,
	ParseIntPipe,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { SkillsService } from './skills.service';
import { SkillDto } from './skill.dto';
import { SkillCategoryDto } from './skillCategory.dto';


@Controller('skills')
export class SkillsController {

	constructor(private skillsService: SkillsService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getSkills(
		@Query('categoryId') categoryId,
		@Request() req
	) {
		return this.skillsService.getSkills(
			req.user.userNo, categoryId
		);
	} 

	@Get('categories')
	@UseGuards(AuthGuard('jwt'))
	async getSkillCategories(
		@Query('categoryId') categoryId,
		@Request() req
	) {
		return this.skillsService.getSkillCategories(
			req.user.userNo, categoryId
		);
	} 

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postSkills(
		@Body() skillDto: SkillDto,
		@Request() req
	) {
		skillDto.userNo = req.user.userNo;
		return this.skillsService.registerSkill(
			skillDto
		);
	} 

	@Post('categories')
	@UseGuards(AuthGuard('jwt'))
	async postCategories(
		@Body() skillCategoryDto: SkillCategoryDto,
		@Request() req
	) {
		skillCategoryDto.userNo = req.user.userNo;
		return this.skillsService.registerSkillCategory(
			skillCategoryDto
		);
	}

	@Delete(':skillNo')
	@UseGuards(AuthGuard('jwt'))
	async deleteSkills(
		@Param('skillNo') skillNo: string,
		@Request() req
	) {
		return this.skillsService.deleteSkill(
			req.user.userNo, skillNo
		);
	}

	@Delete('categories/:categoryId')
	@UseGuards(AuthGuard('jwt'))
	async deleteCategories(
		@Param('categoryId') categoryId: string,
		@Request() req
	) {
		return this.skillsService.deleteSkillCategory(
			req.user.userNo, categoryId
		);
	}

}
