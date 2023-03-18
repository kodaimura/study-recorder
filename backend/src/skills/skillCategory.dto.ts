import {IsInt, IsString, Length} from 'class-validator';


export class SkillCategoryDto {

	userNo: number;

	categoryId: number;

	@IsString()
	@Length(0, 50)
	categoryName: string;
	
}