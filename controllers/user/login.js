const jwt = require("jsonwebtoken");
const { User } = require("../../models")
const SHA256 = require("../../lib/SHA256");
const user = require("../../models/user");

require("dotenv").config();

module.exports = async (req, res) => {

  const { loginId, password } = req.body
  const findUser = await User.findOne({
    raw: true,
    where: { loginId: loginId }
  })

  const userInfo = await User.findOne({
    raw: true,
    where: { loginId: loginId, password: SHA256(password + findUser.salt)}
  })

  if (!userInfo) {
    res.status(404).json({"error": "Invalid user or Wrong password"})
  } 
 
  else {
    const { loginId, password, salt, createdAt, updatedAt, mobile, ...userData } = userInfo
    
    const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET,{ expiresIn: '2h' })
    const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, { expiresIn: '12h' })

    res.cookie('reToken', refreshToken, { httpOnly: true , sameSite: 'none'}).status(201).json({ 
      "data": { 
        "accessToken": accessToken 
      }, 
      "message": "ok" })
    
    } 
}