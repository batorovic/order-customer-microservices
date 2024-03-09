import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { ValidationPipeConfig, setupSwagger } from '@batuhan_kutluay-case/common';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { description } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(cookieParser());

  setupSwagger(
    {
      title: 'Batuhan Kutluay Test Case Microservices Gateway',
      description,
      version: configService.get('version')!,
    },
    app,
  );

  await app.listen(configService.get('port') as string);
}
bootstrap().then(() => {
  console.log('Server is running on PORT: ', process.env.PORT);
  console.log('ENV: ', process.env.NODE_ENV);
  console.log('LOG LEVEL: ', process.env.LOG_LEVEL);
});
