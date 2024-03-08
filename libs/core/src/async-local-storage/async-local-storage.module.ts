import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    ClsModule.forRootAsync({
      global: true,
      inject: [PinoLogger],
      useFactory: (logger) => ({
        middleware: {
          mount: true,
          setup: (cls, req: any, response: any) => {
            const requestId = req.headers['request-id'] ?? uuid();
            cls.set('request-id', requestId);
            response.header('request-id', requestId);
            logger.assign({ 'request-id': requestId });
          },
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class AsyncLocalStorageModule {}
