const { Review } = require("../../models")

module.exports = async (req, res) => {
    const { title, description } = req.body

    if (!title || !description) {
        return res.status(422).send({ "error": 'insufficient parameters supplied' });
    }

    const reviewInfo = await Review.create({
        title: title,
        description: description
    })
    res.status(200).send({ "message": "ok" })

}