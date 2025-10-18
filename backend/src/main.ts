import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev_logger';
import { JsonLogger } from './logger/json_logger';
import { TskvLogger } from './logger/tskv_logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const loggerType = process.env.LOGGER || 'dev';
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  switch (loggerType) {
    case 'dev':
      app.useLogger(new DevLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
  }
  await app.listen(3000);
}
bootstrap();
