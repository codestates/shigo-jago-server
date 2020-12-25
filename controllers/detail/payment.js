const { Reservation } = require("../../models")
const { Payment } = require("../../models")

module.exports = async (req, res) => {

    const authorization = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {

        //* cardNumber, accountNumber가 0으로 시작하면 int로 인식 않는 에러가 있다. string으로 바꿨다.
        //* 결재시 성인을 0으로 하면 422가 뜬다. child는 0일 수 있다.
        const { reserveInfo, payInfo } = req.body
        if (!reserveInfo || !payInfo) {
            return res.status(422).json({ "error": "insufficient parameters supplied" })
        }

        const { checkedin, checkedout, adult, child, userId, hotelId } = reserveInfo
        const { price, howPaid, cardNumber, accountNumber } = payInfo

        const reservationInfo = await Reservation.create({
            checkedin: checkedin,
            checkedout: checkedout,
            adult: adult,
            child: child,
            userId: userId,
            hotelId: hotelId
        })
        console.log(reservationInfo.dataValues.id)
        const { id } = reservationInfo.dataValues;
        const paymentInfo = await Payment.create({
            price: price,
            howPaid: howPaid,
            cardNumber: cardNumber,
            accountNumber: accountNumber,
            ReservationId: id
        });
        console.log(paymentInfo)

        if (!paymentInfo) {
            res.status(404).json({ "error": "not found" });
        } else {
            res.status(200).json({ "message": "ok" }
            )
        }
    }
}