module.exports = async (req, res) => {

    const authorization = req.headers.authorization
    if (authorization === undefined) {
        res.status(400).json({
            "error": "you're currently not logined"
        });

    } else if (!req.cookies.refreshToken) {
        res.status(400).json({ "error": "you're currently not logined" })
    } else {
        res.clearCookie('refreshToken');
        req.headers.authorization = null
        res.status(200).json({ "message": "successfully signed out!" });
    }

}