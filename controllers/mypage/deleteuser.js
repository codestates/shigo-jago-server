const { User } = require("../../models")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {

    const authorization = req.headers.authorization;
    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {
        const token = authorization.split('Bearer ')[1]
        const data = jwt.verify(token, process.env.ACCESS_SECRET)

        const userInfo = await User.destroy({
            where: { id: data.id }
        })
        res.status(200).json({ "message": "OK Delete complete!" })

    }
}