const express = require("express");

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const uploadImage = require("../middleware/uploadImage");

const verifyUser = require("../middleware/verifyUser");
const router = express.Router();

router.post("/createPost", verifyUser, uploadImage.single("image"), createPost);
router.get("/getAllPosts", getPosts);
router.put(
  "/update/:postId",
  verifyUser,
  uploadImage.single("image"),
  updatePost,
);
router.delete("/deletePost/:postId/:userId", verifyUser, deletePost);

module.exports = router;
