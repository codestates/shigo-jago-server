require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Payment } = require('../../models')

// {
//     "data": {
//               "price": "price",
//               "howToPaid": "howToPaid",
//               "cardNumber": "cardNumber"
//             },
            
//     "message": "ok"
// }

//401 { "error": "not authorized" }
module.exports = async (req, res) => {

  const authorization = req.headers.authorization

  if(authorization === undefined) {
    res.status(401).json({
      error: 'not authorized'
    })
  }
  else {

    const token = authorization.split('Bearer ')[1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET)

    const paymentInfo = await Payment.findOne({
        where: { reservationId: req.body.reservationId },
      })
    
    let obj = paymentInfo.dataValues
    delete obj.updatedAt
    delete obj.ReservationId


    res.status(201).json({ 
    "data":  obj,
    "message": "ok" 
    })

  }
}