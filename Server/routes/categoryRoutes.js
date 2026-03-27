const express = require("express");
const {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

// Public routes
router.get("/getCategories", getCategories);

// Admin only routes
router.get("/getAllCategories", verifyUser, getAllCategories);
router.post("/createCategory", verifyUser, createCategory);
router.put("/updateCategory/:categoryId", verifyUser, updateCategory);
router.delete("/deleteCategory/:categoryId", verifyUser, deleteCategory);

module.exports = router;
