import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { RoleModule } from '../role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    RoleModule
  ],
  exports: [
    TypeOrmModule, UserRepository
  ]

})
export class UserModule { }
