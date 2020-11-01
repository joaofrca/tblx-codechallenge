module.exports = {
  development: {
    DB_URL: 'mongodb://localhost/busDEV',
    PORT: 4000,
    LOG_LEVEL: 'debug'
  },
  production: {
    DB_URL: 'mongodb://localhost/busPRD',
    PORT: 4000,
    LOG_LEVEL: 'warn'
  },
  test: {
    DB_URL: 'mongodb://localhost/busTEST',
    PORT: 4000,
    LOG_LEVEL: 'error'
  }
};