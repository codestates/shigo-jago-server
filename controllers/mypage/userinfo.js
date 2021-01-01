require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const { Social } = require('../../models')

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

    const userInfo = await User.findAll({
      raw: true,
      nest: true,
      include: [
        {
          model: Social,
          where: {
            userId: data.id
          }
        }
      ],
      where: { id: data.id },
    })
    
    delete userInfo.password
    delete userInfo.createdAt
    delete userInfo.updatedAt

    console.log(userInfo)

    res.status(201).json({
      data: userInfo,
      message: "ok"
    })
  }
}