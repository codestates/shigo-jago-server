module.exports = async (req, res) => {
    if (!req.cookies.refreshToken) {
        res.status(400).send({ "error": "you're currently not logined" })
    } else {
        res.clearCookie('refreshToken');
        res.status(200).send({ "message": "successfully signed out!" });
    }

}