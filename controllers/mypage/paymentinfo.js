require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Payment } = require('../../models')

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
      raw: true,
      where: { reservationId: req.body.reservationId },
    })
    const { id, updatedAt, ...payInfo } = paymentInfo

    res.status(201).json({ 
      "data":  payInfo,
      "message": "ok" 
    })
  }
}