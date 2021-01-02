require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
    console.log(req.body)
    const { areacode, sigungucode } = req.body
    
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay?ServiceKey=${process.env.API_SECRET}&areaCode=${areacode}&sigunguCode=${sigungucode}&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=A&numOfRows=12&pageNo=1&_type=json`
    try{
        const hotels = await axios.get(url, {
            timeout: 1300
        })
        const hotelList = hotels.data.response.body.items.item
        if(hotelList === undefined) {
            res.status(201).json({
                data: null,
                message: "ok"
            })
        }
        else if(Array.isArray(hotelList)) {
            res.status(201).json({
                data: hotelList,
                message: "ok"
            })   
        }

        else {
          let arr = []
          arr.push(hotelList)
          res.status(201).json({
            data: arr,
            message: "ok"
          })
        }
    }
    catch{
        try{
            const hotels = await axios.get(url, {
                timeout: 1300
            })
            const hotelList = hotels.data.response.body.items.item
            if(hotelList === undefined) {
                res.status(201).json({
                    data: null,
                    message: "ok"
                })
            }
            else if(Array.isArray(hotelList)) {
                res.status(201).json({
                    data: hotelList,
                    message: "ok"
                })   
            }
    
            else {
              let arr = []
              arr.push(hotelList)
              res.status(201).json({
                data: arr,
                message: "ok"
              })
            }
        }
        catch{
            try{
                const hotels = await axios.get(url, {
                    timeout: 1300
                })
                const hotelList = hotels.data.response.body.items.item
                if(hotelList === undefined) {
                    res.status(201).json({
                        data: null,
                        message: "ok"
                    })
                }
                else if(Array.isArray(hotelList)) {
                    res.status(201).json({
                        data: hotelList,
                        message: "ok"
                    })   
                }
        
                else {
                  let arr = []
                  arr.push(hotelList)
                  res.status(201).json({
                    data: arr,
                    message: "ok"
                  })
                }
            }
            catch{
            }
        }
    }
}