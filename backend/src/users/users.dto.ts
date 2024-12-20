import { IsNotEmpty, Length } from 'class-validator';


export class SignupDto {

    @IsNotEmpty()
    @Length(1, 150)
    username: string;

    @IsNotEmpty()
    password: string;
}


export class PutPasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    newPassword: string;
}