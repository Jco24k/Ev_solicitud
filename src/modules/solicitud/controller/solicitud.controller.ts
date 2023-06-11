import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';
import { UpdateSolicitudDto } from '../dto/update-solicitud.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Solicitud } from '../entities/solicitud.entity';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { CurrentPath } from 'src/common/interfaces/current.path.interface';
import { SolicitudService } from '../services/solicitud.service';

@ApiTags(CurrentPath.SOLICITUD.toUpperCase())
@Controller(CurrentPath.SOLICITUD)
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

 
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Solicitud,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return await this.solicitudService.create(createSolicitudDto);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data sent incorrectly',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Solicitud],
  })
  @Get()
  getAll(@Query() paginationQueryParams: PaginationQueryParams) {
    return this.solicitudService.getAll(paginationQueryParams);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: Solicitud,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':search')
  getOne(@Param('search') search: string) {
    return this.solicitudService.getOne(search);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    type: Solicitud,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data Sent incorrectly',
  })
  @Patch(':id')
  async update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updateSolicitudDto: UpdateSolicitudDto,
  ) {
    return await this.solicitudService.update(id, updateSolicitudDto);
  }


  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Delete(':id')
  async delete(@Param('id',ParseUUIDPipe) id: string) {
    return await this.solicitudService.changeState(id,false);
  }


  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Put('restore/:id')
  async restore(@Param('id',ParseUUIDPipe) id: string) {
    return await this.solicitudService.changeState(id,true);
  }

}
