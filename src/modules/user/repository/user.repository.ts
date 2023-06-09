import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update-User.dto';
import { GetOneOptions } from 'src/common/interfaces/get.one.options.interface';
import { CreateUserCompleteDto } from '../dto/create/create-user-complete.dto';
// import { GetOneByIdOptions } from 'src/common/interfaces/get-one-by-id-options.interface';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAll(
        take?: number,
        skip?: number,
        whereOptions?: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    ) {
        return await this.userRepository.find({
            where: whereOptions,
            skip,
            take,
        });
    }
    async getOne({
        id,
        error = true,
    }: GetOneOptions<string>) {
        const User = await this.userRepository.findOne({
            where: { id },
        });
        if (!User && error)
            throw new NotFoundException('User not found');
        return User;
    }
    async create(createUserDto: CreateUserCompleteDto) {
        return await this.userRepository.save(createUserDto);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const userfind = await this.getOne({ id });
        updateUserDto.isActive = userfind.isActive;
        await this.userRepository.save({
            ...userfind,
            ...updateUserDto
        });
        return {
            ...userfind, ...updateUserDto
        }
    }
    async changeState(id: string, isActive: boolean) {
        const user = await this.getOne({ id });
        user.isActive = isActive;
        await this.userRepository.save(user);
        return {
            message: `User ${!isActive?'deleted':'restored' } successfully `
          }
    }
}
