// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const passport = require("passport");

router.get("/", postController.getAllPosts);
router.get("/:postId/like", postController.getLikes);
router.post("/:postId/like",passport.authenticate('jwt', { session: false }), postController.likePost);

module.exports = router;
