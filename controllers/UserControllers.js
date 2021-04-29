const models = require('../models')

const userControllers = {}

userControllers.create = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ user })
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        // console.log(user, 'got user info');
        if (user.password === req.body.password) {
            res.json({user, message: 'login successful'})
        } else {
            res.status(400).json({ message: 'login failed' })
        }
    }catch(error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.verify = async (req, res) => {
    // console.log(req.headers);
    try {
        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        // console.log(user);
        if (user) {
            res.json({ user, message: 'user found'})
        } else {
            res.status(400).json({ message: 'user not found' })
        }
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = userControllers