const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

// Post Reviews Route
router.post("/", isLoggedIn,validateReview, wrapAsync(ReviewController.createReview));

//Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;