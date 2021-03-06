const express = require('express')
const router = express.Router()
const { mypageController } = require("../controllers")

router.post("/paymentinfo", mypageController.paymentinfo)
router.get("/reserveinfo", mypageController.reserveinfo)
router.get("/userinfo", mypageController.userinfo)
router.post("/writereview", mypageController.writereview)
router.post("/deleteuser", mypageController.deleteuser)
router.post("/useredit", mypageController.useredit)

module.exports = router