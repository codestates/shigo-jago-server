const { User } = require("../../models")
const { Social } = require("../../models")
const SHA256 = require('../../lib/SHA256')
const crypto = require('crypto')
require("dotenv").config();

module.exports = async (req, res) => {
    const { loginId, name, password, mobile, corporation, socialAccount, socialEmail } = req.body;

    if(corporation === 'kakao') {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const salt = crypto.randomBytes(8).toString("hex")
        const [userInfo, created] = await User.findOrCreate({
            raw: true,
            where: {
                loginId: loginId
            },
            defaults: {
                name: name,
                password: SHA256(password + salt),
                salt: salt,
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
            res.status(409).send({ "error": "email exists" })
        }
    }

    else if(corporation === 'google') {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const salt = crypto.randomBytes(8).toString("hex")
        console.log('password', password, 'salt', salt, 'final', SHA256(password + salt))
        const [userInfo, created] = await User.findOrCreate({
            raw: true,
            where: {
                loginId: loginId
            },
            defaults: {
                name: name,
                password: SHA256(password + salt),
                salt: salt,
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
            res.status(409).send({ "error": "email exists" })
        }
    }

    else {
        if (!loginId || !password || !name || !mobile) {
            return res.status(422).send({ "error": "insufficient parameters supplied" })
        }
        const salt = crypto.randomBytes(8).toString("hex")
        const [userInfo, created] = await User.findOrCreate({
            where: {
                loginId: loginId
            },
            defaults: {
                name: name,
                password: SHA256(password + salt),
                salt: salt,
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