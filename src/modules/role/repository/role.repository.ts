import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/Role.entity';
import { FindOptionsOrder, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-Role.dto';
import { UpdateRoleDto } from '../dto/update-Role.dto';
import { GetOneOptions } from 'src/common/interfaces/get.one.options.interface';
// import { GetOneByIdOptions } from 'src/common/interfaces/get-one-by-id-options.interface';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }
    async getAll(
        take?: number,
        skip?: number,
        whereOptions?: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        orderOptions?: FindOptionsOrder<Role>
    ) {
        return await this.roleRepository.find({
            where: whereOptions,
            skip,
            take,
            // order: orderOptions
        });
    }
    async getOne({
        where,
        error = true,
    }: GetOneOptions<Role>) {
        const role = await this.roleRepository.findOne({
            where: where,
        });
        if (!role && error)
            throw new NotFoundException('Role not found');
        return role;
    }
    async create(createRoleDto: CreateRoleDto) {
        return await this.roleRepository.save(createRoleDto);
    }
    async update(id: string, updateRoleDto: UpdateRoleDto) {
        const role = await this.getOne({ where: { id } });
        updateRoleDto.isActive = role.isActive;
        await this.roleRepository.update({ id }, {
            ...updateRoleDto
        });

        return {
            ...role, ...updateRoleDto
        }
    }
    async changeState(id: string, isActive: boolean) {
        const role = await this.getOne({ where: { id } });
        role.isActive = isActive;
        await this.roleRepository.save(role);
        return {
            message: `Role ${!isActive ? 'deleted' : 'restored'} successfully `
        }
    }



    async verifyIdsExists(ids: string[]) {
        const roles = await this.roleRepository.find({ where: { id: In(ids) } });
        if (roles.length !== ids.length) {
            throw new NotFoundException("Some Roles id's does not exists in DB")
        }
        return roles;

    }
}
