const express = require('express');
const router = express.Router();
const { detailController } = require("../controllers")

router.post("/payment", detailController.payment)
router.post("/review", detailController.review)

module.exports = router