const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, isCafeOwner } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const singerController = require("../controllers/singers.js");

// new registration as singer
router.get("/new",isLoggedIn, wrapAsync(singerController.newRegistration));


// new singer registration

// ----- we can also add singervalidation here (for both singer and req.body.singer)
router
  .route("/:id")
  .post(isLoggedIn,upload.single('singer[photo]'),wrapAsync(singerController.newSinger))
  .get(isLoggedIn,wrapAsync(singerController.showSinger))

// edit route
router
  .route("/:id/edit")
  .get(isLoggedIn,wrapAsync(singerController.showEditPage))
  .post(isLoggedIn,upload.single('singer[photo]'),wrapAsync(singerController.edit));

// take stage route
router.get("/:id/participate",isLoggedIn,wrapAsync(singerController.allStage));
router.get("/:id/event/:eventId",isLoggedIn,wrapAsync(singerController.takeStage));


module.exports = router;
