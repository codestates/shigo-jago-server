const express = require('express')
const router = express.Router()
const { searchController } = require("../controllers")

router.post("/list", searchController.list)
router.post("/detail", searchController.detail)

module.exports = router