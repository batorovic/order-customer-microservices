import { LogLevel } from '@batuhan_kutluay-case/common/enums';
import { name } from 'package.json';

export const DEFAULT_ENV_VALUES = {
  NAME: name || 'log',
  NODE_ENV: 'dev',
  PORT: 9292,
  LOG_LEVEL: LogLevel.DEBUG,
  MONGODB_URI: 'mongodb://mongo:27017/customer',
  REDIS_URI: 'redis://redis:6379',
  REDIS_HOST: 'redis',
  REDIS_PORT: 6379,
  TEST: {
    PORT: 3010,
    MONGODB_URI: 'mongodb://localhost:27017/test',
  },
};
