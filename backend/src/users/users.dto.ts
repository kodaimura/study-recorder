import { IsNotEmpty, Length, Matches } from 'class-validator';


export class SignupDto {

    @IsNotEmpty()
    @Length(1, 150)
    username: string;

    @IsNotEmpty()
    @Length(8, 128)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    password: string;
}


export class PutPasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Length(8, 128)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    newPassword: string;
}
