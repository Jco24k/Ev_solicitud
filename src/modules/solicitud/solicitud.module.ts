import { Module } from '@nestjs/common';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudController } from './controller/solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { SolicitudRepository } from './repository/solicitud.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SolicitudController],
  providers: [SolicitudService, SolicitudRepository],
  imports: [
    TypeOrmModule.forFeature([
      Solicitud
    ]),
    AuthModule
  ],
  exports: [
    TypeOrmModule, SolicitudRepository
  ]
})
export class SolicitudModule { }
