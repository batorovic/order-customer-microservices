import { DynamicModule, Module } from '@nestjs/common';
import { RedisModuleAsyncOptions } from './interfaces';
import { RedisCoreModule } from './redis.core-module';

@Module({})
export class RedisModule {
  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options)],
      exports: [RedisCoreModule],
    };
  }
}
