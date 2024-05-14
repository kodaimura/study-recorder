import {IsInt, IsString, Min, Max} from 'class-validator';


export class CommentDto {

	userNo: number;

	@IsInt()
	@Min(2000)
	@Max(3000)
	year: number;

	@IsInt()
	@Min(1)
	@Max(12)
	month: number;

	@IsInt()
	@Min(1)
	@Max(31)
	day: number;

	@IsString()
	comment: string;

}