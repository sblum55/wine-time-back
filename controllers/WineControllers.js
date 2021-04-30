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
            description: req.body.description,
            image: req.body.image
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

wineControllers.find = async (req, res) => {
    try {
        console.log('this was hit');
        const wine = await models.wine.findOne ({
            where: {
                id: req.params.id
            }
        })
        res.json({wine})
    }catch (error) {
        console.log(error);
    }
}

wineControllers.destroy = async (req, res) => {
    console.log(req.params);
    try {
        const wine = models.wine.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json({wine, message: 'deleted successfully'})

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}

wineControllers.update = async (req, res) => {
    console.log(req.params);
    try {
        const wine = await models.wine.findOne({
            where: {
                id: req.params.id
            }
        })

        console.log(wine);

        await wine.update({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            purchase_location: req.body.purchase_location,
            description: req.body.description,
            image: req.body.image
        })

        console.log('made it here', req.body);

        res.json({wine, message: 'wine updated successfully'})

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}
 
module.exports = wineControllers