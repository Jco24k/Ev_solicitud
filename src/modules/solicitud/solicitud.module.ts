import { Module } from '@nestjs/common';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudController } from './controller/solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { SolicitudRepository } from './repository/solicitud.repository';

@Module({
  controllers: [SolicitudController],
  providers: [SolicitudService, SolicitudRepository],
  imports: [
    TypeOrmModule.forFeature([
      Solicitud
    ])
  ],
  exports: [
    TypeOrmModule, SolicitudRepository
  ]
})
export class SolicitudModule { }
