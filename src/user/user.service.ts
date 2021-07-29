import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return {
      ...user,
      password: 'HIDDEN',
    };
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  createOne(data: CreateUserDto): Promise<User> {
    return this.usersRepository.save(data);
  }

  updateOne(id: string, data: UpdateUserDto): Promise<any> {
    return this.usersRepository.update(id, data);
  }

  deleteOne(id: string): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
