const express = require("express");
const router = express.Router();
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const CafeController = require("../controllers/caves.js");
const wrapAsync = require("../utils/wrapAsync.js");

// index and filters 
router
    .route("/")
    .get(wrapAsync(CafeController.index))
    .post(isLoggedIn,wrapAsync(CafeController.indexFilter));

// show route
router.get("/:id",isLoggedIn,wrapAsync(CafeController.showCafe))

// create review route
router.post("/:id/reviews",isLoggedIn,validateReview,wrapAsync(CafeController.createReview));

// delete review route
router.delete("/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(CafeController.deleteReview));

module.exports = router;