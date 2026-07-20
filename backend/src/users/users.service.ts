import {
    Injectable,
    ConflictException,
    BadRequestException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';
import { SignupDto, PutPasswordDto } from './users.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    hashLegacyPassword(password: string) {
        return crypto
            .createHash('sha256')
            .update(password)
            .digest('hex')
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async verifyPassword(password: string, hash: string): Promise<'bcrypt' | 'legacy' | null> {
        if (hash.startsWith('$2')) {
            return await bcrypt.compare(password, hash) ? 'bcrypt' : null;
        }

        return hash === this.hashLegacyPassword(password) ? 'legacy' : null;
    }

    async getByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async getById(userId: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { userId } });
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async signup(dto: SignupDto): Promise<void> {
        if (await this.getByUsername(dto.username)) {
            throw new ConflictException();
        }

        const user = new User;
        user.username = dto.username;
        user.password = await this.hashPassword(dto.password)
        await this.userRepository.save(user);

        return;
    }

    async updatePassword(username: string, dto: PutPasswordDto): Promise<void> {
        const user = await this.getByUsername(username);

        if (user && await this.verifyPassword(dto.password, user.password)) {
            user.password = await this.hashPassword(dto.newPassword);
            await this.userRepository.save(user);
        } else {
            throw new BadRequestException();
        }

        return;
    }

}
