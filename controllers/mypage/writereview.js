const { Review } = require("../../models")
const { Reservation } = require("../../models")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {

    const authorization = req.headers.authorization
    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {
        //reservationinfo 하나의 컴포넌트에서 가지고있던 예약정보의 id를 req.body에 담아서 보낸다면?
        const { title, description, reservationId } = req.body

        if (!title || !description) {
            return res.status(422).send({ "error": 'insufficient parameters supplied' });
        }

        //예약정보 하나를 가져온다. userId와 hotelId를 입력하기 위해 쓰인다.
        const reserveInfo = await Reservation.findOne({
            where: { id: reservationId }
        })
        const { userId, hotelId } = reserveInfo;

        const reviewInfo = await Review.create({
            title: title,
            description: description,
            userId: userId,
            hotelId: hotelId
        });
        res.status(200).send({ "message": "ok" })

    }
}