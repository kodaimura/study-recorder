import { 
	Injectable, 
	ConflictException, 
	BadRequestException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { User } from './user.entity';
import { SignUpDto, ChangePasswordDto } from './users.dto';


@Injectable()
export class UsersService {

	constructor(
    	@InjectRepository(User)
    	private readonly userRepository: Repository<User>
  	) {}

	hashPassword (password: string){
		return crypto
			.createHash('sha256')
			.update(password)
			.digest('hex')
	}

  	async findOne(username: User['username']): Promise<User | undefined> {
   		return this.userRepository.findOne({ where: { username } });
  	}

  	async signup(signUpDto: SignUpDto): Promise<void> {
  		if(await this.findOne(signUpDto.username)) {
  			throw new ConflictException();
  		}

  		await this.userRepository.insert({
  			...signUpDto,
  			password: this.hashPassword(signUpDto.password)
  		});

  		return;
  	}

  	async changePassword(username: User['username'], changePasswordDto: ChangePasswordDto): Promise<void> {
  		const user = await this.findOne(username);
 
 		if (user && user.password === this.hashPassword(changePasswordDto.password)) {
 			await this.userRepository.update(
 				{ 
 					username: username
 				},
 				{
  					password: this.hashPassword(changePasswordDto.newPassword)
  				}
  			);
    	} else {
    		throw new BadRequestException();
    	}

  		return;
  	}

}