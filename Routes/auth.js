const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/authcontroller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);




module.exports = router;
