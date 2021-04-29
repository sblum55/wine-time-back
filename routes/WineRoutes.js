const wineRoutes = require('express').Router()

const wineControllers = require('../controllers/WineControllers')

wineRoutes.post('/', wineControllers.create)
wineRoutes.get('/allwines', wineControllers.index)
wineRoutes.get('/allwines/:id', wineControllers.find)

module.exports = wineRoutes