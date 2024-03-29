import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionsFilter } from '@batuhan_kutluay-case/common';
import { AsyncLocalStorageModule, HealthModule, LoggerModule } from '@batuhan_kutluay-case/core';
import { ServiceClientModule } from '@batuhan_kutluay-case/core/service-client/service-client.module';
import { CustomerModule } from './api-gateway/apps/customer/customer.module';
import { OrderModule } from './api-gateway/apps/order/order.module';
import { configuration, envVariablesSchema } from './config';
@Module({
  imports: [
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
    LoggerModule,
    AsyncLocalStorageModule,
    HealthModule,
    ServiceClientModule,
    CustomerModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
})
export class AppModule {}
