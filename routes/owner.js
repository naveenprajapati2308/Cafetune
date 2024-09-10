const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, isCafeOwner } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const ownerController = require("../controllers/owners.js");

// make owner route
router.get("/new",isLoggedIn,wrapAsync(ownerController.makeOwner));

// edit route
router.get("/edit",isLoggedIn,wrapAsync(ownerController.editCafe));

// edit route
router.post("/:cafeOwnerId/edit",isLoggedIn,isCafeOwner,upload.single('cafe[image]'), wrapAsync(ownerController.edit));

// owner create and show route
router
    .route("/:cafeOwnerId")
    .get(isLoggedIn, isCafeOwner,wrapAsync(ownerController.showOwner))
    .post(isLoggedIn,isCafeOwner,upload.single('cafe[image]'),ownerController.createOwner);

router.get("/:cafeOwnerId/events/new",isLoggedIn,isCafeOwner,wrapAsync(ownerController.newEvent))

router.post("/:cafeOwnerId/events",isLoggedIn,isCafeOwner,upload.single("event[image]"),wrapAsync(ownerController.createEvent))

module.exports = router;
