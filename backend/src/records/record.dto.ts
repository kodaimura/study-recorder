import {IsInt, Min, Max} from 'class-validator';


export class RecordDto {

	userId: number;

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

	comment: string;

	@IsInt()
	minuteTime: number;
	
}