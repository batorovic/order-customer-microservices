import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RedisModuleAsyncOptions } from './interfaces';
import { REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCoreModule {
  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisCoreModule,
      imports: [],
      providers: [this.createAsyncOptionsProvider(options), RedisService],
      exports: [RedisService],
    };
  }
  private static createAsyncOptionsProvider(
    options: RedisModuleAsyncOptions,
  ): Provider {
    return {
      provide: REDIS_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options?.inject,
    };
  }
}
