const wineRoutes = require('express').Router()

const wineControllers = require('../controllers/WineControllers')

wineRoutes.post('/', wineControllers.create)
wineRoutes.get('/allwines', wineControllers.index)
wineRoutes.get('/allwines/:id', wineControllers.find)
wineRoutes.delete('/allwines/:id', wineControllers.destroy)
wineRoutes.put('/allwines/:id', wineControllers.update)
wineRoutes.post('/allwines/:id/comments', wineControllers.createComments)

module.exports = wineRoutes