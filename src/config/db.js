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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
};
