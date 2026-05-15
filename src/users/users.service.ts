import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {

    return this.userRepository.findOne({
      where: { id },
    });

  }

  async create(body: any): Promise<User> {

    const user = this.userRepository.create(body as User);

    return await this.userRepository.save(user);
}
  
}