const wineRoutes = require('express').Router()

const wineControllers = require('../controllers/WineControllers')

wineRoutes.post('/', wineControllers.create)

module.exports = wineRoutes