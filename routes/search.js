const express = require("express");
const router = express.router();

const { searchController } = require("../controllers");

router.post("/list", searchController.list.post);

router.post("/detail", searchController.detail.detail.post);

router.post("/detail/payment", searchController.detail.payment.post);

router.post("/detail/review", searchController.detail.review.post);

