const jwt = require("jsonwebtoken");
const { User } = require("../../models")
const { Social } = require("../../models")
require("dotenv").config();

module.exports = async (req, res) => {
  
  const { socialEmail, socialAccount, token } = req.body
  
  if(token) {

    const data = jwt.verify(token, process.env.ACCESS_SECRET)

    await Social.create({
      userId: data.id,
      corporation: 'kakao',
      socialEmail: socialEmail,
      socialAccount: String(socialAccount)
    })

    const userInfo = await User.findOne({
      raw: true,
      where: {
        id: data.id
      }
    })

    const { password, salt, createdAt, updatedAt, mobile, ...userData } = userInfo

    const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET,{ expiresIn: '2h' })
    const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, { expiresIn: '12h' })

    res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'none'})
    res.status(201).json({ 
      "data": { 
        "accessToken": accessToken 
      }, 
      "message": "ok" })
  }

  else if(socialEmail, socialAccount) {

    const socialInfo = await Social.findOne({
      raw: true,
      where: {
        socialEmail: socialEmail,
        socialAccount: socialAccount
      }
    })
    if (!socialInfo) {
      res.status(200).json({"error": "not kakao auth user"})
    }

    else {

      const userInfo = await User.findOne({
        raw: true,
        where: {
          id: socialInfo.userId
        }
      })

      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET,{ expiresIn: '2h' })
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, { expiresIn: '12h' })

      res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'none'})
      res.status(201).json({ 
          "data": { 
          "accessToken": accessToken 
       }, 
          "message": "ok" })
    }

  }
  else {
      res.status(400).json({"error": "bad request"})
  }
}
