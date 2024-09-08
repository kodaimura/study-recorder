import {
    IsInt,
    IsString,
    Min,
    Max,
    Length
} from 'class-validator';


export class ThemeDto {

    userId: number;

    @IsInt()
    @Min(2000)
    @Max(3000)
    year: number;

    @IsInt()
    @Min(0)
    @Max(12)
    month: number;

    @IsString()
    @Length(0, 100)
    theme: string;

}