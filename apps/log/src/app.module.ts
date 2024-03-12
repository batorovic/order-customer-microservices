import { AsyncLocalStorageModule, HealthModule, LoggerModule, RedisModule } from '@batuhan_kutluay-case/core';
import { DatabaseModule } from '@batuhan_kutluay-case/core/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, envVariablesSchema } from '../config';
import { LogModule } from './log/log.module';

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
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('redis.uri') as string,
      }),
    }),
    DatabaseModule,
    HealthModule,
    LogModule,
  ],
})
export class AppModule {}
