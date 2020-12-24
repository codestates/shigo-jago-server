const { User } = require("../../models")
require("dotenv").config();
module.exports = async (req, res) => {
    const { email, name, password, mobile } = req.body;

    if (!email || !password || !name || !mobile) {
        res.status(422).send({ "error": "insufficient parameters supplied" })
    }
    const [userInfo, created] = await User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            password: password,
            mobile: mobile
        }
    })
    if (created) {
        res.status(201).send({ "message": "successfully signed up!" })
    } else {
        res.status(409).send({ "error": "email exists" })
    }

}