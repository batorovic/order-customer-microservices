import { HttpExceptionsFilter } from '@batuhan_kutluay-case/common';
import { AsyncLocalStorageModule, LoggerModule } from '@batuhan_kutluay-case/core';
import { DatabaseModule } from '@batuhan_kutluay-case/core/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { configuration, envVariablesSchema } from '../config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    LoggerModule,
    AsyncLocalStorageModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envVariablesSchema,
      validationOptions: {
        allowUnknown: true,
      },
      load: [configuration],
      cache: true,
    }),
    DatabaseModule,
    CustomerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
})
export class AppModule {}
