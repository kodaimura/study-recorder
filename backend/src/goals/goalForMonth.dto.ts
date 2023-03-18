import {IsInt, IsString, Min, Max, Length} from 'class-validator';


export class GoalForMonthDto {

	userNo: number;

	@IsInt()
	@Min(2000)
	@Max(3000)
	year: number;

	@IsInt()
	@Min(1)
	@Max(12)
	month: number;

	@IsString()
	@Length(0, 100)
	goal: string;

}