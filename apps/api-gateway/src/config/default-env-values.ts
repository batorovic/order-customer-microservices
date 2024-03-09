import { Environment, LogLevel } from '@batuhan_kutluay-case/common';
import { name } from '../../package.json';

export const DEFAULT_ENV_VALUES = {
  NAME: name || 'api-gateway',
  NODE_ENV: Environment.DEVELOPMENT,
  PORT: 8000,
  LOG_LEVEL: LogLevel.DEBUG,
  SERVICE_CLIENT_TIMEOUT: 10000,
  MICROSERVICE_URLS_CUSTOMER_SERVICE: 'http://customer:8002/',

  TEST: {
    PORT: 3010,
  },
};
