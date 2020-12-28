require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

module.exports = async (req, res) => {

    const authorization = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {
        const token = authorization.split('Bearer ')[1]
        const data = jwt.verify(token, process.env.ACCESS_SECRET)
        //이름 비밀번호 전화번호 email

        const editInfo = await User.update({
            name: req.body.name,
            mobile: req.body.mobile
        }, {
            where: {
                email: data.id
            }
        })

        res.status(200).json({
            "message": "OK Change complete!"
        })
    }
}