/*eslint-disable no-process-env */
const env = process.env;

export default {
  dbConfig: {
    host: '192.168.99.100',
    port: env.npm_package_config_dbPort
  },
  appConfig: {
    port: env.PORT || 3000,
    NODE_ENV: env.NODE_ENV || 'development'
  }
};
