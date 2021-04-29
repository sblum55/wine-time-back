const models = require('../models')

const wineControllers = {}

wineControllers.create = async (req, res) => {
    try {
        const user = await models.user.findOne ({
            where: {
                id: req.headers.authorization
            }
        })

        const wine = await models.wine.create ({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            purchase_location: req.body.purchase_location,
            description: req.body.description
        })

        await user.addWine(wine)
        await wine.reload()

        res.json({wine})

    }catch (error) {
        console.log(error);
    }
}

wineControllers.index = async (req, res) => {
    try {
        const wine = await models.wine.findAll()

        res.json((wine))
    }catch (error) {
        console.log(error);
    }
}

module.exports = wineControllers