import { LogLevel } from '@batuhan_kutluay-case/common/enums';
import { name } from 'package.json';

export const DEFAULT_ENV_VALUES = {
  NAME: name || 'order',
  NODE_ENV: 'dev',
  PORT: 8001,
  LOG_LEVEL: LogLevel.DEBUG,
  MONGODB_URI: 'mongodb://mongo:27017/order',
  TEST: {
    PORT: 3010,
    MONGODB_URI: 'mongodb://localhost:27017/order',
  },
  REDIS_URI: 'localhost:6379',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
};
