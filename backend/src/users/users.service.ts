import { 
	Injectable, 
	ConflictException, 
	BadRequestException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { User } from './user.entity';
import { SignupDto, PutPasswordDto } from './users.dto';


@Injectable()
export class UsersService {

	constructor(
    	@InjectRepository(User)
    	private readonly userRepository: Repository<User>
  	) {}

	hashPassword (password: string) {
		return crypto
			.createHash('sha256')
			.update(password)
			.digest('hex')
	}

  	async getByUsername(username: string): Promise<User | undefined> {
   		return this.userRepository.findOne({ where: { username } });
  	}

  	async signup(dto: SignupDto): Promise<void> {
  		if (await this.getByUsername(dto.username)) {
  			throw new ConflictException();
  		}

		const user = new User;
		user.username = dto.username;
		user.password = this.hashPassword(dto.password)
  		await this.userRepository.save(user);

  		return;
  	}

  	async updatePassword(username: string, dto: PutPasswordDto): Promise<void> {
  		const user = await this.getByUsername(username);
 
 		if (user && user.password === this.hashPassword(dto.password)) {
			user.password = this.hashPassword(dto.newPassword);
 			await this.userRepository.save(user);
    	} else {
    		throw new BadRequestException();
    	}

  		return;
  	}

}