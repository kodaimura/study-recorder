import { Injectable, ConflictException  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { User } from './user.entity';


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

  	async findOne(userId: User['userId']): Promise<User | undefined> {
   		return this.userRepository.findOne({ where: { userId } });
  	}

  	async register(userDate: Omit<User, 'userNo'>): Promise<void> {
  		if(await this.findOne(userDate.userId)) {
  			throw new ConflictException();
  		}

  		await this.userRepository.insert({
  			...userDate,
  			password: this.hashPassword(userDate.password)
  		});

  		return;
  	}

}