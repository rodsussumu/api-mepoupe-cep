import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data) {
    const user = await this.findById(id);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}
