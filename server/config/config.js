const dotenv = require("dotenv")
dotenv.config()

module.exports =
{

  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOSTNAME,
    "dialect": "postgres"
  }
}