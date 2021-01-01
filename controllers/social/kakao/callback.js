require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
  
    const { authorizationCode, isDelete, pathname } = req.body

  if(authorizationCode) {
    if(pathname === '/kakao') {
      const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_RESTKEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_AUTH}&code=${authorizationCode}&client_secret=${process.env.REACT_APP_KAKAO_SECRET}`
      const kakaoAcctoken = await axios.post(url)
      res.status(200).json({
        data: kakaoAcctoken.data,
        message: "ok"
      })
    }

    else if(isDelete) {
      const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_RESTKEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_DELETE}&code=${authorizationCode}&client_secret=${process.env.REACT_APP_KAKAO_SECRET}`
      const kakaoAcctoken = await axios.post(url)
      res.status(200).json({
        data: kakaoAcctoken.data,
        message: "ok"
      })
    }

    else {
      const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_RESTKEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&code=${authorizationCode}&client_secret=${process.env.REACT_APP_KAKAO_SECRET}`
      const kakaoAcctoken = await axios.post(url)

      res.status(200).json({
        data: kakaoAcctoken.data,
        message: "ok"
      })
    }   
  }
  else res.status(400).json({
    error: 'something error'
  })
}