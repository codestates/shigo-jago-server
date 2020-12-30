require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
    const { authorizationCode, isDelete } = req.body

    if (authorizationCode) {
        const url = `https://accounts.google.com/o/oauth2/token?code=${authorizationCode}&client_id=88270045748-rpghv716gefg0loa2t073mr09qv7ej8l.apps.googleusercontent.com&client_secret=X_qTkfsV_ff4xpvOTJ0AjdGd&redirect_uri=http://localhost:3000/google&grant_type=authorization_code`
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