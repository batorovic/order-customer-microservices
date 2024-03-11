import { MICROSERVICE_URL_CONFIG_NAME } from '@batuhan_kutluay-case/core/service-client/constants';
import { DEFAULT_ENV_VALUES } from './default-env-values';

export const configuration = () => ({
  env: process.env.NODE_ENV || 'dev',
  name: process.env.NAME as string,
  port: parseInt(<string>process.env.PORT, 10),
  logger: {
    level: process.env.LOG_LEVEL,
    prettyPrint: process.env.LOG_PRETTY_PRINT === 'true',
    autoLogging: false,
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
  },
  services: {
    urls: {
      [MICROSERVICE_URL_CONFIG_NAME.CUSTOMER]:
        process.env.MICROSERVICE_URLS_CUSTOMER_SERVICE || DEFAULT_ENV_VALUES.MICROSERVICE_URLS_CUSTOMER_SERVICE,
      [MICROSERVICE_URL_CONFIG_NAME.ORDER]:
        process.env.MICROSERVICE_URLS_ORDER_SERVICE || DEFAULT_ENV_VALUES.MICROSERVICE_URLS_ORDER_SERVICE,
    },
    timeout: parseInt(<string>process.env.SERVICE_CLIENT_TIMEOUT, 10),
  },
});
