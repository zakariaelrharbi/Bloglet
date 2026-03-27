const express = require("express");
const { updateUserInfo, deleteUser } = require("../controllers/userController");
const uploadImage = require("../middleware/uploadImage");
const verifyUser = require("../middleware/verifyUser");
const router = express.Router();

router.put(
  "/update/:userId",
  verifyUser,
  uploadImage.single("profilePicture"),
  updateUserInfo,
);
router.delete("/delete/:userId", verifyUser, deleteUser);

module.exports = router;
