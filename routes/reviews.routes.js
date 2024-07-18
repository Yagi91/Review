const express = require("express");
const reviewsCtrl = require("../controllers/reviews.controller");

const router = express.Router();

router.route("/api/reviews").get(reviewsCtrl.list).post(reviewsCtrl.create);

router
  .route("/api/reviews/:review")
  .get(reviewsCtrl.read)
  .put(reviewsCtrl.update)
  .delete(reviewsCtrl.remove);

router.param("review", reviewsCtrl.productReviewByID);

module.exports = router;
