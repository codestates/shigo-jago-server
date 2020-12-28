require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

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

    let userInfo = await User.findOne({
      where: { id: data.id },
    })
    let obj = userInfo.dataValues
    delete obj.password
    delete obj.createdAt
    delete obj.updatedAt

    res.status(201).json({
      data: obj,
      message: "ok"
    })
  }
}