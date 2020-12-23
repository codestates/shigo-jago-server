const jwt = require('jsonwebtoken')
const { Reservations } = require('../../models')
const { Hotels } = require('../../models')
module.exports = {

    userInfo: async (req, res) => {
        const authorization = req.headers.authorization

        if(authorization === undefined) {
            res.status(401).json({
                error: 'not authorized'
            })
        }
        else {
            
            const token = authorization.split('Bearer ')[1]
            const data = jwt.verify(token, process.env.ACCESS_SECRET)

            const reserveInfo = await Reservations.findAll({
                where: { userId: data.id },
            })
            if(!reserveInfo) {
                res.status(401).json({
                    error: "not found"
                })
            }
            let arr = reserveInfo.dataValues
            arr.forEach(obj => {
                const hotelNamesearch = await Hotels.findOne({
                    where: { id: obj.hotelId }
                })
                const hotelName = hotelNamesearch.dataValues.hotelname
                obj.hotelname = hotelName
                delete obj.createdAt
                delete obj.updatedAt
                delete userId
                delete hotelId
            })

            res.status(201).json({ 
                "data":  obj,
                "message": "ok" 
            })
        }
    }
}
