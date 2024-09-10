const express = require("express");
const router = express.Router();
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const eventController = require("../controllers/events.js");
const wrapAsync = require("../utils/wrapAsync.js");

// index and filter route
router
    .route("/")
    .get(isLoggedIn,wrapAsync(eventController.index))
    .post(isLoggedIn,wrapAsync(eventController.eventFilter))

router.get("/:id",isLoggedIn,wrapAsync(eventController.showEvent))

router.post("/:id/reviews",isLoggedIn,wrapAsync(eventController.createReview))

module.exports = router;