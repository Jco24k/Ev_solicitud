import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports: [
    TypeOrmModule.forFeature([
      Role
    ])
  ],
  exports: [TypeOrmModule, RoleRepository],


})
export class RoleModule { }
