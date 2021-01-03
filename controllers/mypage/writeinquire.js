const { Inquire } = require("../../models")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {

    const authorization = req.headers.authorization
    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {
        const { email, name, subject, message } = req.body;

        if (!email || !name || !subject || !message) {
            return res.status(422).send({ "error": 'insufficient parameters supplied' });
        }

        // const token = authorization.split('Bearer ')[1]
        // const data = jwt.verify(token, process.env.ACCESS_SECRET)

        const inquireInfo = await Inquire.create({
            email: email,
            name: name,
            subject: subject,
            message: message,
        })

        res.status(201).send({
            "message": "successfully write inquire!"
        })
    }
}