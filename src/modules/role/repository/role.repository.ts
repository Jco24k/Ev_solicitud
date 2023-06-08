import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/Role.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-Role.dto';
import { UpdateRoleDto } from '../dto/update-Role.dto';
import { GetOneOptions } from 'src/common/interfaces/get.one.options.interface';
// import { GetOneByIdOptions } from 'src/common/interfaces/get-one-by-id-options.interface';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly RoleRepository: Repository<Role>,
    ) { }
    async getAll(
        take?: number,
        skip?: number,
        whereOptions?: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
    ) {
        return await this.RoleRepository.find({
            where: whereOptions,
            skip,
            take,
        });
    }
    async getOne({
        id,
        error = true,
    }: GetOneOptions<string>) {
        const role = await this.RoleRepository.findOne({
            where: { id },
        });
        if (!role && error)
            throw new NotFoundException('Role not found');
        return role;
    }
    async create(createRoleDto: CreateRoleDto) {
        return await this.RoleRepository.save(createRoleDto);
    }
    async update(id: string, updateRoleDto: UpdateRoleDto) {
        const role = await this.getOne({ id });
        updateRoleDto.isActive = role.isActive;
        await this.RoleRepository.update({ id }, {
            ...updateRoleDto
        });

        return {
            ...role, ...updateRoleDto
        }
    }
    async changeState(id: string, isActive: boolean) {
        const role = await this.getOne({ id });
        role.isActive = isActive;
        await this.RoleRepository.save(role);
        return {
            message: `Role ${!isActive?'deleted':'restored' } successfully `
          }
    }
}
