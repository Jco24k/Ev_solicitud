import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';
import { UpdateSolicitudDto } from '../dto/update-solicitud.dto';
import { SolicitudRepository } from '../repository/solicitud.repository';
import { Solicitud } from '../entities/solicitud.entity';
import { handleExceptions } from 'src/common/errors/handleExceptions';
import { PaginationQueryParams } from 'src/common/dto/pagination-query-params.dto';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { FindOptionsWhere } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class SolicitudService {

  constructor(
    private readonly solicitudRepository: SolicitudRepository,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) { }

  async create(createSolicitudDto: CreateSolicitudDto) {
    try {
      const solicitud = await this.solicitudRepository.create(createSolicitudDto);
      return solicitud;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, Solicitud.name);
    }
  }

  async getAll(queryParams: PaginationQueryParams) {
    const { query } = this.configService;
    const { state = 'active', page_number = query.page_number, page_size = query.page_size } = queryParams;
    const isActiveOptions: FindOptionsWhere<Solicitud> =
      (state == 'active') ? { isActive: true } :
        (state == 'inactive') ? { isActive: false } :
          {};
    const skip = page_number > query.min_page ?
      page_number * page_size : 0;
    const take = page_size;
    return this.solicitudRepository.getAll(take, skip,
      { ...isActiveOptions },

    );
  }

  async getOne(search: string) {
    let whereOptions: FindOptionsWhere<Solicitud> | FindOptionsWhere<Solicitud>[] = [
      { nro_solicitud: search }
    ]
    if (isUUID(search)) {
      whereOptions.push({ id: search })
    }
    return await this.solicitudRepository.getOne({ where: whereOptions });
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    try {
      const solicitudUpdate = await this.solicitudRepository.update(
        id,
        updateSolicitudDto,
      );
      return solicitudUpdate;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      handleExceptions(error, Solicitud.name);
    }
  }
  async changeState(id: string, isActive: boolean) {
    return await this.solicitudRepository.changeState(id, isActive);
  }
}
