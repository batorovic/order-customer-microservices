export enum LogLevel {
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace',
}

export enum Environment {
  DEVELOPMENT = 'dev',
  PRODUCTION = 'prod',
  TEST = 'test',
  STAGING = 'stg',
}

export enum SORT_ORDER {
  ASC = 1,
  DESC = -1,
}

export enum PaginationSortByValues {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
