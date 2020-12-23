const express = require("express");
const router = express.router();

const { userController } = require("../controllers");

router.post("/signup", userController.signup.post);

router.post("/login", userController.login.post);

router.post("/logout", userController.logout.post);

