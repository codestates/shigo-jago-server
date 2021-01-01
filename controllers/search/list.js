require('dotenv').config()
const axios = require('axios')

module.exports = async (req, res) => {
     
    const { areacode, sigungucode } = req.body
    
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay?ServiceKey=${process.env.API_SECRET}&areaCode=${areacode}&sigunguCode=${sigungucode}&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=A&numOfRows=12&pageNo=1&_type=json`
    
    const hotels = await axios.get(url)


    const hotelList = hotels.data.response.body.items.item
    
    if(Array.isArray(hotelList)) {
        const data = []
        hotelList.forEach(obj => {
            let newObj = Object.assign({}, {
                addr1 : obj.addr1,
                addr2 : obj.addr2,
                areacode: obj.areacode,
                sigungucode: obj.sigungucode,
                contentid: obj.contentid,
                contenttypeid: obj.contenttypeid,
                image1 : obj.firstimage,
                image2 : obj.firstimage2,
                readcount: obj.readcount,
                mobile: obj.tel,
                title: obj.title,
                mapx: obj.mapx,
                mapy: obj.mapy
            })
            data.push(newObj)
        })
    
        res.status(201).json({
            data: data,
            message: "ok"
        })
    }

    else {
        let arr = []
        let newObj = Object.assign({}, {
            addr1: hotelList.addr1,
            addr2: hotelList.addr2,
            areacode: hotelList.areacode,
            sigungucode: hotelList.sigungucode,
            contentid: hotelList.contentid,
            contenttypeid: hotelList.contenttypeid,
            image1: hotelList.firstimage,
            image2: hotelList.firstimage2,
            readcount: hotelList.readcount,
            mobile: hotelList.tel,
            title: hotelList.title,
            mapx: hotelList.mapx,
            mapy: hotelList.mapy
        })
        arr.push(newObj)
        res.status(201).json({
            data: arr,
            message: "ok"
        })
    }


}