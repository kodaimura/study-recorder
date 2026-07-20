import {
    IsInt,
    Min,
    Max
} from 'class-validator';


export class MonthlyGoalDto {

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
    @Min(0)
    @Max(44640)
    targetMinuteTime: number;

}
