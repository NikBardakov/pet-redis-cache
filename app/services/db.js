/* var Pool = require('pg').Pool
var db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'redis_development',
  password: 'postgres',
  port: 5432,
})
 */


const Sequilize = require('sequelize')

var db = new Sequilize('redis_development', 'postgres', 'postgres', {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})

module.exports = db;