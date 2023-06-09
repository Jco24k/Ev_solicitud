import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/role.repository';
import { Role } from '../entities/Role.entity';
import { handleExceptions } from 'src/common/errors/handleExceptions';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository: RoleRepository,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(createRoleDto);
      return role;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, Role.name);
    }
  }

  getAll(queryParams: PaginationQueryParams) {
    const { query } = this.configService;
    const { state = 'active', page_number = query.page_number, page_size = query.page_size } = queryParams;
    const isActiveOptions: FindOptionsWhere<Role> =
      (state == 'active') ? { isActive: true } :
        (state == 'inactive') ? { isActive: false } :
          {};
    const skip = page_number > query.min_page ?
      page_number * page_size : 0;
    const take = page_size;
    return this.roleRepository.getAll(take, skip,
      { ...isActiveOptions },
      
    );
  }

  async getOneById(id: string) {
    return await this.roleRepository.getOne({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const roleUpdate = await this.roleRepository.update(
        id,
        updateRoleDto,
      );
      return roleUpdate;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, Role.name);
    }
  }
  async changeState(id: string, isActive: boolean) {
    return await this.roleRepository.changeState(id, isActive);
  }
}
