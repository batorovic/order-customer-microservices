export const configuration = () => ({
  env: process.env.NODE_ENV || 'dev',
  name: process.env.NAME as string,
  port: parseInt(<string>process.env.PORT, 10),
  database: {
    mongo: {
      uri: <string>process.env.MONGODB_URI,
      name: 'customer',
      retryAttempts: 10,
      maxPoolSize: 20,
      wtimeoutMS: 5000,
    },
  },
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

  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(<string>process.env.REDIS_PORT, 10),
    uri: process.env.REDIS_URI,
  },
});
