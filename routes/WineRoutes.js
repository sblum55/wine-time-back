const wineRoutes = require('express').Router()

const wineControllers = require('../controllers/WineControllers')

wineRoutes.post('/', wineControllers.create)
wineRoutes.get('/allwines', wineControllers.index)

module.exports = wineRoutes