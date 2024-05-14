import {IsNotEmpty, Length} from 'class-validator';


export class SignUpDto {

	@IsNotEmpty()
	@Length(1, 30)
	username: string;

	@IsNotEmpty()
	password: string;
}


export class ChangePasswordDto {
	
	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	newPassword: string;
}