const jwt = require("jsonwebtoken");
const { User } = require("../../models")
require("dotenv").config();

module.exports = {
    //리프레시는 쿠키에, 엑세스는 응답에
    post: (req, res) => {
        const { email, password } = req.body
        User.findOne({
            where: {
                email,
                password
            },
        })
            .then(data => {
                if (!data) {
                    return res.json({ data: null, message: 'not authorized' });
                }
                //data 전체를 받는건지 email만 받는건지 확인하기
                const accessToken = jwt.sign(data.email, process.env.ACCESS_SECRET);
                const refreshToken = jwt.sign(data.data.email, process.env.REFRESH_SECRET);
                res.cookie("refreshToken", refreshToken, { httpOnly: true })
                res.json({ data: { accessToken }, message: "ok" });
            })
            .catch((err) => {
                console.log(err);
            });

    }
}