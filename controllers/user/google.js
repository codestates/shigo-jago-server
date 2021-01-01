const jwt = require("jsonwebtoken");
const { User } = require("../../models")
const { Social } = require("../../models")
require("dotenv").config();

module.exports = async (req, res) => {

  const { socialEmail, socialAccount } = req.body

  if(socialEmail, socialAccount) {

    const socialInfo = await Social.findOne({
      where: {  
        socialEmail: socialEmail,
        socialAccount: socialAccount
      }
    })

    if (!socialInfo) {
      res.status(200).json({"error": "not google auth user"})
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
          "message": "ok" 
        })
    }
  }
  else {
      res.status(400).json({"error": "bad request"})
  }
}
