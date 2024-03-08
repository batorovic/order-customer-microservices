import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IncomingMessage } from 'http';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

const passUrl = ['/health', '/documentation'];
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          autoLogging: {
            ignore: (req: IncomingMessage) => passUrl.includes((<Request>req).originalUrl),
          },
          level: configService.get('logger.level'),
          customLogLevel: function (req, res, err) {
            if (res.statusCode >= 400 && res.statusCode < 500) {
              return 'warn';
            } else if (res.statusCode >= 500 || err) {
              return 'error';
            } else if (res.statusCode >= 300 && res.statusCode < 400) {
              return 'silent';
            }
            return 'debug';
          },
          serializers: {
            res(res) {
              if (res.statusCode >= 400) {
                res.body = res.raw.locals.data;
                res.isBoomed = true;
              }
              return res;
            },
          },
          customProps(req, res: any) {
            return {
              ['request-id']: res.getHeader('request-id'),
            };
          },
          formatters: {
            level(level) {
              return { level };
            },
          },
        },
      }),
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
