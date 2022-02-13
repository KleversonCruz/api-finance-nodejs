require('dotenv').config();

module.exports = {
  development: {
    storage: './database.sqlite',
    dialect: 'sqlite',
  },
  test: {
    storage: './databaseTest.sqlite',
    dialect: 'sqlite',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
