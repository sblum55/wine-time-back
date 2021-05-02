const models = require('../models')
const jwt = require('jsonwebtoken')

const wineControllers = {}

wineControllers.create = async (req, res) => {
    console.log(req.headers);
    try {
        const encryptedId = req.headers.authorization
        console.log(encryptedId);
        const decryptedId = jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log(decryptedId);
        const user = await models.user.findOne ({
            where: {
                id: decryptedId.userId
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
            },
            include: [
                {model: models.user},
                {model: models.comment,
                    include: models.user}
            ]
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

wineControllers.createComments = async (req, res) => {
    console.log(req.headers, req.params);
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        console.log('found user', user);

        const wine = await models.wine.findOne({
            where: {
                id: req.params.id
            }
        })

        console.log('found wine', wine);

        const comment = await models.comment.create({
            title: req.body.title,
            description: req.body.description
        })

        console.log('found comment', comment);

        await comment.setUser(user)
        await comment.setWine(wine)

        res.json({ comment })

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}
 
module.exports = wineControllers