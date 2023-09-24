
const { DataTypes } = require('sequelize')
const db = require('../services/db')

const Test_Data = db.define('test_data',
  // Описание таблиц
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

Test_Data.sync({ force: true });

module.exports = Test_Data