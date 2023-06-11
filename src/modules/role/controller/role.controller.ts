import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../entities/Role.entity';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { CurrentPath } from 'src/common/interfaces/current.path.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/interfaces/roles.enum';

@ApiTags(CurrentPath.ROLE.toUpperCase())
@Controller(CurrentPath.ROLE)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Role,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }


  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Role],
  })
  @Get()
  getAll(@Query() paginationQueryParams: PaginationQueryParams) {
    return this.roleService.getAll(paginationQueryParams);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Role,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.getOneById(id);
  }


  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Role,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data Sent incorrectly',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roleService.changeState(id, false);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Put('restore/:id')
  async restore(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roleService.changeState(id, true);
  }

}
