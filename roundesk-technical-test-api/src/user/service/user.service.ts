import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username }});
    }

    async create(user: User): Promise<User> {
        try {
            return this.usersRepository.save(user);
        }catch (e) {
            console.log(e)
        }

    }

    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id }});
    }
}
