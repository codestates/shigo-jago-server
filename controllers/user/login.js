const jwt = require("jsonwebtoken");
const { User } = require("../../models")
require("dotenv").config();

module.exports = async (req, res) => {

  const { email, password } = req.body
  const userInfo = await User.findOne({
    where: { email: email, password: password }
  })
  if (!userInfo) res.status(404).json({"error": "Invalid user or Wrong password"})
 
  else {
    let obj = userInfo.dataValues
    delete obj.password
    console.log(userInfo.dataValues.id)
    const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET,{ expiresIn: '2h' })
    const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, { expiresIn: '12h' })

    res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'none'})
    res.status(201).json({ 
      "data": { 
        "accessToken": accessToken 
      }, 
      "message": "ok" })
    } 
}