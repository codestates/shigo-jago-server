require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Reservation, Payment, Hotel } = require("../../models")

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

        const { reserveInfo, payInfo } = req.body
        if (!reserveInfo || !payInfo) {
            return res.status(422).json({ "error": "insufficient parameters supplied" })
        }

        const { checkedin, checkedout, adult, child, hotelName } = reserveInfo
        const { price, howPaid, cardNumber, accountNumber, company } = payInfo

        const hotelInfo = await Hotel.findOrCreate({
            where: {
                hotelname: hotelName
            }, defaults: {
                hotelname: hotelName
            }
        })
        
        const reservationInfo = await Reservation.create({
            checkedin: checkedin,
            checkedout: checkedout,
            adult: adult,
            child: child,
            userId: data.id,
            hotelId: hotelInfo[0].dataValues.id
        })

        const paymentInfo = await Payment.create({
            price: price,
            howPaid: howPaid,
            cardNumber: cardNumber,
            accountNumber: accountNumber,
            company: company,
            ReservationId: reservationInfo.dataValues.id
        })

        if (!paymentInfo) {
            res.status(404).json({ "error": "not found" });
        } else {
            res.status(200).json({ "message": "ok" }
            )
        }
    }
}