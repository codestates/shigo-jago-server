const express = require('express');
const router = express.Router();
const { socialController } = require("../controllers")

router.post("/kakao/callback", socialController.kakao)
router.post("/google/callback", socialController.google)

module.exports = router