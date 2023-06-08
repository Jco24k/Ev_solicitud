import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Booststrap')

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on port ${process.env.PORT || 3000}`)
}
bootstrap();