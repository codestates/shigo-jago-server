require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const { Social } = require('../../models')

module.exports = async (req, res) => {

  const authorization = req.headers.authorization

  if (authorization === undefined) {
    res.status(201).json({
      error: 'not authorized'
    })
  }
  else {
    const token = authorization.split('Bearer ')[1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET, async function(err, decoded) {
      if (err) res.status(401).end()

    const userInfo = await User.findOne({
      raw: true,
      where: {
        id: decoded.id
      }
    })

    const socialInfo = await Social.findAll({
      raw: true,
      where: {
        userId: userInfo.id
      }
    })

    if(socialInfo.length > 0) {
      userInfo.Social = []
      socialInfo.forEach(obj => {
        const { createdAt, updatedAt, UserId, userId, ...socialData } = obj
        userInfo.Social.push(socialData)
      })
    }

    else {
      userInfo.Social = null
    }

    const { password, createdAt, updatedAt, ...userData } = userInfo
    
    res.status(201).json({
      data: userData,
      message: "ok"
    })
    }) 
    

  }
}