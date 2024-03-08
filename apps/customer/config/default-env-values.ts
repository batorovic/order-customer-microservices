import { LogLevel } from '@batuhan_kutluay-case/common/enums';
import { name } from 'package.json';

export const DEFAULT_ENV_VALUES = {
  NAME: name || 'customer',
  NODE_ENV: 'dev',
  PORT: 8002,
  LOG_LEVEL: LogLevel.DEBUG,
  MONGODB_URI: 'mongodb://mongo:27017/customer',
  TEST: {
    PORT: 3010,
    MONGODB_URI: 'mongodb://localhost:27017/test',
  },
  MICROSERVICE_ACCESS_TOKEN: '7zRWuwsGuh67XcjR',
};
