import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { FindOptionsWhere } from 'typeorm';
import { User } from '../entities/User.entity';
import { handleExceptions } from 'src/common/errors/handleExceptions';
import { RoleRepository } from 'src/modules/role/repository/role.repository';
import { Role } from 'src/modules/role/entities/Role.entity';

@Injectable()
export class UserService {


  constructor(
    private readonly userRepository: UserRepository,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly roleRepository: RoleRepository
  ) { }

  async create(createuserDto: CreateUserDto) {
    const { roles, ...userDetails } = createuserDto
    const rolesFind: Role[] = await this.roleRepository.verifyIdsExists(createuserDto.roles)
    try {
      const userCreate = await this.userRepository.create({
        ...userDetails, roles: rolesFind
      });
      return userCreate;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, User.name);
    }
  }

  async getAll(queryParams: PaginationQueryParams) {
    const { query } = this.configService;
    const { state = 'active', page_number = query.page_number, page_size = query.page_size } = queryParams;
    const isActiveOptions: FindOptionsWhere<User> =
      (state == 'active') ? { isActive: true } :
        (state == 'inactive') ? { isActive: false } :
          {};
    const skip = page_number > query.min_page ?
      page_number * page_size : 0;
    const take = page_size;
    return await this.userRepository.getAll(take, skip,
      { ...isActiveOptions },

    );
  }

  async getOneById(id: string) {
    return await this.userRepository.getOne({
      where: { id }
    });
  }

  async update(id: string, updateRoleDto: UpdateUserDto) {
    try {
      const { roles } = updateRoleDto
      if (roles) {
        updateRoleDto.roles = await this.roleRepository.verifyIdsExists(
          roles?.map(({ id }) => id) || []
        )
      }

      const userUpdate = await this.userRepository.update(
        id,
        { ...updateRoleDto },
      );

      return userUpdate;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, User.name);
    }
  }

  async changeState(id: string, isActive: boolean) {
    return await this.userRepository.changeState(id, isActive);
  }
}
