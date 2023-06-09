import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/User.entity';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { CurrentPath } from 'src/common/interfaces/current.path.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/interfaces/roles.enum';

@ApiTags(CurrentPath.USER.toUpperCase())
@Controller(CurrentPath.USER)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR] })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [User],
  })
  @Get()
  getAll(@Query() paginationQueryParams: PaginationQueryParams) {
    return this.userService.getAll(paginationQueryParams);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR], sameUser: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOneById(id);
  }

  @Auth({ roles: [Roles.ADMINISTRADOR], sameUser: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data Sent incorrectly',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
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
    return await this.userService.changeState(id, false);
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
    return await this.userService.changeState(id, true);
  }
}
