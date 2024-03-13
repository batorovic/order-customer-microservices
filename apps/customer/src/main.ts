import { ValidationPipeConfig, setupSwagger } from '@batuhan_kutluay-case/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  console.log('s server...');

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));

  setupSwagger({ title: name, description, version }, app);

  await app.listen(configService.get('port') as string);
}
bootstrap().then(() => {
  console.log('Server is running on PORT: ', process.env.PORT);
  console.log('ENV: ', process.env.NODE_ENV);
  console.log('LOG LEVEL: ', process.env.LOG_LEVEL);
});
