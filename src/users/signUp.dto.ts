import {IsNotEmpty, Length} from 'class-validator';


export class SignUpDto {

	userNo: number;

	@IsNotEmpty()
	@Length(1, 30)
	userId: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	passwordConfirm: string;

	@IsNotEmpty()
	@Length(1, 30)
	userName: string;

}