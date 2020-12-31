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
      raw: true,
      nest : true,
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

      // reserveInfo = reserveInfo.map(el => el.get({ plain: true}))
     
      let newArr = []
      let arr = reserveInfo

      arr.forEach(async (obj,idx) => {
        let newObj = Object.assign({}, {
          id: obj.id,
          checkedin: obj.checkedin,
          checkedout: obj.checkedout,
          adult: obj.adult,
          child: obj.child,
          createdAt: obj.createdAt,
          userId: obj.userId,
          hotelName: obj.Hotel.hotelname
        })
        let data = await find(obj.userId, obj.Hotel.id)

        data.length > 0 
        ? (
          newObj.isReview = true,
          newObj.review = data
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
  const reviewInfo = await Review.findAll({
    raw: true,
    where: {
      userId: x,
      hotelId: y
    }
  })
  return reviewInfo
}