import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, In, Repository } from 'typeorm';
import { GetOneOptions } from 'src/common/interfaces/get.one.options.interface';
import { Solicitud } from '../entities/solicitud.entity';
import { CreateSolicitudDto } from '../dto/create-solicitud.dto';
import { UpdateSolicitudDto } from '../dto/update-solicitud.dto';

@Injectable()
export class SolicitudRepository {
    constructor(
        @InjectRepository(Solicitud)
        private readonly solicitudRepository: Repository<Solicitud>,
    ) { }
    async getAll(
        take?: number,
        skip?: number,
        whereOptions?: FindOptionsWhere<Solicitud> | FindOptionsWhere<Solicitud>[],
        orderOptions?: FindOptionsOrder<Solicitud>
    ) {
        return await this.solicitudRepository.find({
            where: whereOptions,
            skip,
            take,
            // order: orderOptions
        });
    }
    async getOne({
        where,
        error = true,
    }: GetOneOptions<Solicitud>) {
        const solicitud = await this.solicitudRepository.findOne({
            where: where,
        });
        if (!solicitud && error)
            throw new NotFoundException('Solicitud not found');
        return solicitud;
    }
    async create(createSolicitudDto: CreateSolicitudDto) {
        return await this.solicitudRepository.save(createSolicitudDto);
    }
    async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
        const solicitud = await this.getOne({ where: { id } });
        updateSolicitudDto.isActive = solicitud.isActive;
        await this.solicitudRepository.update({ id }, {
            ...updateSolicitudDto
        });

        return {
            ...solicitud, ...updateSolicitudDto
        }
    }
    async changeState(id: string, isActive: boolean) {
        const Solicitud = await this.getOne({ where: { id } });
        Solicitud.isActive = isActive;
        await this.solicitudRepository.save(Solicitud);
        return {
            message: `Solicitud ${!isActive ? 'deleted' : 'restored'} successfully `
        }
    }
}
