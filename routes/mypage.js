const express = require("express");
const express = require("express");
const router = express.router();

const { mypageController } = require("../controllers");

router.get("/paymentinfo", mypageController.paymentinfo.get);

router.get("/reserveinfo", mypageController.reserveinfo.get);

router.get("/userinfo", mypageController.userinfo.get);

router.post("/writereview", mypageController.writereview.post);

router.post("/deleteuser", mypageController.deleteuser.post)