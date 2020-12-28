require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
    
    const { contentid, contenttypeid } = req.body
    
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${process.env.API_SECRET}&contentTypeId=${contenttypeid}&contentId=${contentid}&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y&_type=json`
    
    const hotelinfo = await axios.get(url)

    res.status(200).json(hotelinfo.data.response.body.items.item)
}