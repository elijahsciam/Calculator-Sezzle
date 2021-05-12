const router = require('express').Router()
const {Calculations} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const calcs = await Calculations.findAll()
    res.json(calcs)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCalc = await Calculations.create({
      equation: req.body.equation
    })
    res.send(newCalc)
  } catch (err) {
    next(err)
  }
})
