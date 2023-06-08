import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { JoiValidationSchema } from './config/joi.validation';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ config ],
      isGlobal: true,
      validationSchema: JoiValidationSchema 
    }),
    DatabaseModule,
    UserModule,
    RoleModule,
    CommonModule,

  ],
})
export class AppModule { }
