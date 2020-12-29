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
        const { title, description, reservationId } = req.body

        if (!title || !description) {
            return res.status(422).send({ "error": 'insufficient parameters supplied' });
        }

        const reserveInfo = await Reservation.findOne({
            where: { id: reservationId }
        })
        const { userId, hotelId } = reserveInfo;

        const [reviewInfo, created] = await Review.findOrCreate({
            where: {
                userId: userId,
                hotelId: hotelId
            },
            defaults: {
                title: title,
                description: description,
                userId: userId,
                hotelId: hotelId
            }
        })
        if (created) {
            res.status(201).send({
                "message": "successfully write review!"
            })
        } else {
            const editReviewInfo = await Review.update(
                {
                    title: title,
                    description: description
                },
                {
                    where: { id: reviewInfo.id }
                }
            )
            res.status(201).send({
                "message": "successfully update review!"
            })

        }
    }
}
// const reviewInfo = await Review.create({
//     title: title,
//     description: description,
//     userId: userId,
//     hotelId: hotelId
// });