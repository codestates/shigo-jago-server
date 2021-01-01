const express = require('express');
const router = express.Router();
const { socialController } = require("../controllers")

router.post("/kakao/callback", socialController.kakao)
router.post("/kakao/revoke", socialController.kakaoRevoke)
router.post("/google/callback", socialController.google)
router.post("/google/revoke", socialController.googleRevoke)

module.exports = router