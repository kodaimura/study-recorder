import {IsInt, IsString, Length} from 'class-validator';


export class SkillDto {
	
	userNo: number;

	@IsInt()
	categoryId: number;

	@IsString()
	@Length(0, 50)
	item1: string;

	@IsString()
	@Length(0, 50)
	item2: string;

	@IsString()
	comment: string;
	
}