const config = {
  "development": {
    "username": process.env.PG_DEV_USER,
    "password": process.env.PG_DEV_PASSWORD,
    "database": process.env.PG_DEV_DB,
    "host": process.env.PG_DEV_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.PG_TEST_USER,
    "password": process.env.PG_TEST_PASSWORD,
    "database": process.env.PG_TEST_DB,
    "host": process.env.PG_TEST_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PG_PROD_USER,
    "password": process.env.PG_PROD_PASSWORD,
    "database": process.env.PG_PROD_DB,
    "host": process.env.PG_PROD_HOST,
    "dialect": "postgres"
  }
}

module.exports = config;