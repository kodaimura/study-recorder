import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Friend } from './friend.entity';


@Injectable()
export class FriendsService {

	constructor(
    	@InjectRepository(Friend)
    	private readonly friendRepository: Repository<Friend>,
  	) {}

}
