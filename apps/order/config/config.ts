export const configuration = () => ({
  env: process.env.NODE_ENV || 'dev',
  name: process.env.NAME as string,
  port: parseInt(<string>process.env.PORT, 10),
  database: {
    mongo: {
      uri: <string>process.env.MONGODB_URI,
      name: 'order',
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
});
