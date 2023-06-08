import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports:[
    TypeOrmModule.forFeature([
      Role
    ])
  ],
  

})
export class RoleModule {}
