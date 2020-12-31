require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Reservation } = require('../../models')
const { Hotel } = require('../../models')
const { Review } = require('../../models')

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

    const reserveInfo = await Reservation.findAll({
      include: [
        { model: Hotel, required: true }
      ],
      where: { userId: data.id },
    })

    if (!reserveInfo.length) {
      res.status(404).json({
        error: "not found"
      })
    }
    else {

      let newArr = []
      let arr = reserveInfo

      arr.forEach(async (obj,idx) => {
        let newObj = Object.assign({}, {
          id: obj.dataValues.id,
          checkedin: obj.dataValues.checkedin,
          checkedout: obj.dataValues.checkedout,
          adult: obj.dataValues.adult,
          child: obj.dataValues.child,
          createdAt: obj.dataValues.createdAt,
          userId: obj.dataValues.userId,
          hotelName: obj.dataValues.Hotel.hotelname
        })
        let data = await find(obj.dataValues.userId, obj.dataValues.Hotel.id)
        data 
        ? (
          newObj.isReview = true,
          newObj.review = data.dataValues
          )  
        : newObj.isReview = false
        newArr.push(newObj)
        idx === arr.length-1 ? res.status(201).json({
          "data": newArr,
          "message": "ok"
        })
        : null
      })
    }
  }
}

async function find (x, y) {
  const reviewInfo = await Review.findOne({
    where: {
      userId: x,
      hotelId: y
    }
  })
  return reviewInfo
}