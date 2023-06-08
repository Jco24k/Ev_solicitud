import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ config ],
      isGlobal: true,
      validationSchema: JoiValidationSchema 
    }),
    DatabaseModule,

  ],
})
export class AppModule { }
