const { User } = require("../../models")
const { Social } = require("../../models");

require("dotenv").config();

module.exports = async (req, res) => {
    const { loginId, name, password, mobile, corporation, socialAccount, socialEmail } = req.body;
    console.log('signup', req.body)

    if(corporation === 'kakao') {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const [userInfo, created] = await User.findOrCreate({
            raw: true,
            where: {
                loginId: loginId
            },
            defaults: {
                name: name,
                password: password,
                mobile: mobile
            }
        })
        if (created) {
            await Social.create({
                userId: userInfo.id,
                corporation: corporation,
                socialEmail: socialEmail,
                socialAccount: String(socialAccount)
            })
            res.status(201).send({ "message": false })
        } 
        else {
            res.status(202).send({ "error": "email exists" })
        }
    }

    else if(corporation === 'google') {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const [userInfo, created] = await User.findOrCreate({
            raw: true,
            where: {
                loginId: loginId,
                name: name
            },
            defaults: {
                password: password,
                mobile: mobile
            }
        })
        if (created) {
            await Social.create({
                userId: userInfo.id,
                corporation: corporation,
                socialEmail: socialEmail,
                socialAccount: String(socialAccount)
            })
            res.status(201).send({ "message": false })
        }
        else {
            res.status(202).send({ "error": "email exists" })
        }
    }

    else {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const [userInfo, created] = await User.findOrCreate({
            where: {
                loginId: loginId
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

    

}