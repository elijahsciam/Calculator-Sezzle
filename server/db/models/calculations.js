const Sequelize = require('sequelize')
const db = require('../db')

const Calculations = db.define('calculations', {
  equation: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Calculations
