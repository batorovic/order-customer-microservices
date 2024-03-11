import { Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import Redis from 'ioredis';
import { RedisModuleOptions } from './interfaces';
import { REDIS_MODULE_OPTIONS } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(RedisService.name);
  private redisClient: Redis;

  constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    protected readonly options: RedisModuleOptions,
  ) {}

  onModuleInit() {
    this.redisClient = new Redis(this.options.url);

    this.redisClient.on('connect', () => {
      this.logger.log('Connected to redis.');
    });

    this.redisClient.on('error', (err) => {
      console.log(err);
      this.logger.log('Error connecting to Redis Client ...', err);
    });
  }

  async setKeyValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async setKeyValueWithTTL(key: string, value: object, ttlInSeconds: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async getValueOfKey(key: string): Promise<string | null> {
    const value = await this.redisClient.get(key);
    return value;
  }

  createHash(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }

  onApplicationShutdown() {
    this.redisClient.quit();
    this.logger.log('log', 'Redis Disconnected.');
  }
}
