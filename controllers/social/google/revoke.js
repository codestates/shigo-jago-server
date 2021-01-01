require('dotenv').config()
const jwt = require('jsonwebtoken')
const { Social } = require('../../../models')

module.exports = async (req, res) => {

  const authorization = req.headers.authorization
  if (authorization === undefined) {
    res.status(201).json({
      error: 'not authorized'
    })
  }

  else {
    const token = authorization.split('Bearer ')[1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET)
    
    const deleteGoogle = await Social.destroy({
      where: {
          userId: data.id,
          corporation: 'google'
      }
    })
    
    if(deleteGoogle) {
      res.status(201).json({message: 'delete social account'})
    }
  }
}