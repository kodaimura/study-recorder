import {IsInt, IsString, Min, Max, Length} from 'class-validator';


export class GoalForYearDto {

	userNo: number;

	@IsInt()
	@Min(2000)
	@Max(3000)
	year: number;

	@IsString()
	@Length(0, 100)
	goal: string;
	
}