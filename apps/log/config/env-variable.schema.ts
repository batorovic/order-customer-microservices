import { Environment, LogLevel } from '@batuhan_kutluay-case/common/enums';
import * as Joi from 'joi';
import { DEFAULT_ENV_VALUES } from './default-env-values';

export const envVariablesSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.DEVELOPMENT),

  NAME: Joi.string().default(DEFAULT_ENV_VALUES.NAME),

  PORT: Joi.alternatives().conditional('NODE_ENV', {
    is: Environment.TEST,
    then: Joi.number().default(DEFAULT_ENV_VALUES.TEST.PORT),
    otherwise: Joi.number().default(DEFAULT_ENV_VALUES.PORT),
  }),

  LOG_LEVEL: Joi.string()
    .valid(...Object.values(LogLevel))
    .default(DEFAULT_ENV_VALUES.LOG_LEVEL),
  LOG_PRETTY_PRINT: Joi.boolean().default(false),

  MONGODB_URL: Joi.alternatives().conditional('NODE_ENV', {
    is: Environment.TEST,
    then: Joi.string().default(DEFAULT_ENV_VALUES.TEST.MONGODB_URI),
    otherwise: Joi.string().default(DEFAULT_ENV_VALUES.MONGODB_URI),
  }),

  REDIS_HOST: Joi.string().default(DEFAULT_ENV_VALUES.REDIS_HOST),
  REDIS_URI: Joi.string().default(DEFAULT_ENV_VALUES.REDIS_URI),
  REDIS_PORT: Joi.number().default(DEFAULT_ENV_VALUES.REDIS_PORT),
});
