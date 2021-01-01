require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
    const { authorizationCode, isDelete } = req.body

    if (authorizationCode) {
        const url = `https://accounts.google.com/o/oauth2/token?code=${authorizationCode}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
        const googleAcctoken = await axios.post(url)
        res.status(200).json({
            data: googleAcctoken.data,
            message: "ok"
        })
    }
    else res.status(400).json({
        error: 'something error'
    })
}