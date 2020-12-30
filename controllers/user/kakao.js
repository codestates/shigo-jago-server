const e = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../models")
require("dotenv").config();

module.exports = async (req, res) => {

  const { email, kakaoId } = req.body

  if(email, kakaoId) {

    const userInfo = await User.findOne({
      where: { email: email }
    })
    if (!userInfo) {
      res.status(404).json({"error": "not kakao auth"})
    }

    const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET,{ expiresIn: '2h' })
    const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, { expiresIn: '12h' })

    res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'none'})
    res.status(201).json({ 
      "data": { 
        "accessToken": accessToken 
      }, 
      "message": "ok" })

  }
  else {
      res.status(400).send('bad request')
  }
}