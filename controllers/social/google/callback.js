require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
    const { authorizationCode, isDelete, pathname } = req.body

    if (authorizationCode && pathname === "/google/auth") {
        const url = `https://accounts.google.com/o/oauth2/token?code=${authorizationCode}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_DP_AUTH}&grant_type=authorization_code`
        const googleAcctoken = await axios.post(url)
        res.status(201).json({
            data: googleAcctoken.data,
            message: "ok"
        })
    }
    else if (authorizationCode && !isDelete) {
      const url = `https://accounts.google.com/o/oauth2/token?code=${authorizationCode}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_DP}&grant_type=authorization_code`
      const googleAcctoken = await axios.post(url)
      res.status(201).json({
          data: googleAcctoken.data,
          message: "ok"
      })
    }
      else if(authorizationCode && isDelete) {
        const url = `https://accounts.google.com/o/oauth2/token?code=${authorizationCode}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_DP_DELETE}&grant_type=authorization_code`
        const googleAcctoken = await axios.post(url)
        res.status(201).json({
            data: googleAcctoken.data,
            message: "ok"
        })
    }
    else res.status(400).json({
        error: 'something error'
    })
}