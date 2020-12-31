require('dotenv').config()
const axios = require('axios')
const { Review } = require('../../models')
const { Hotel } = require('../../models')

module.exports = async (req, res) => {
    const { contenttypeId, contentId } = req.body
    
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${process.env.API_SECRET}&contentTypeId=${contenttypeId}&contentId=${contentId}&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y&_type=json`

    const hotel = await axios.get(url)

    const title = hotel.data.response.body.items.item.title

    const hotelInfo = await Hotel.findOne({
      raw: true,
      where: { hotelname: title },
    })

    if(hotelInfo) {
      const review = await Review.findAll({
        raw: true,
        where: { hotelId: hotelInfo.id}
      })
  
      res.status(201).json({ 
          "data":  review,
          "message": "ok" 
        })
    }
    
    else {
      res.status(201).json({ 
        "data":  [],
        "message": "ok" 
      })
    }
}