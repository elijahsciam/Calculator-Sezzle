const Sequelize = require('sequelize')
const db = require('../db')

const Calculations = db.define('calculations', {
  result: {
    type: Sequelize.INTEGER
  },
  equation: {
    type: Sequelize.STRING
  }
})

module.export = Calculations
