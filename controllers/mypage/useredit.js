require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

module.exports = async (req, res) => {
    const { name, mobile } = req.body
    const authorization = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    } else {
        const token = authorization.split('Bearer ')[1]
        const data = jwt.verify(token, process.env.ACCESS_SECRET)

        const editInfo = await User.update({
            name: name,
            mobile: mobile,
            updatedAt: new Date(),

        }, {
            where: {
                email: data.email,
            }
        })

        res.status(200).json({
            "message": "OK Change complete!"
        })
    }

}