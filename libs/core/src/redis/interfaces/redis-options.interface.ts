import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface RedisModuleOptions {
  url: string;
}

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
}
