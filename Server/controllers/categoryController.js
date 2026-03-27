const Category = require("../models/categoryModel");

// Get all active categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .select("name slug description");

    return res.status(200).json({
      categories,
      message: "Categories fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

// Get all categories (admin only)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      categories,
      message: "All categories fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

// Create new category (admin only)
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({
      message: "Category name is required",
      error: true,
      success: false,
    });
  }

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } },
        {
          slug: name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .trim(),
        },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        error: true,
        success: false,
      });
    }

    const newCategory = new Category({
      name: name.trim(),
      description: description?.trim() || "",
    });

    const savedCategory = await newCategory.save();

    return res.status(201).json({
      category: savedCategory,
      message: "Category created successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

// Update category (admin only)
const updateCategory = async (req, res) => {
  const { name, description, isActive } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({
      message: "Category name is required",
      error: true,
      success: false,
    });
  }

  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    // Check if new name conflicts with existing categories
    if (name.trim().toLowerCase() !== category.name.toLowerCase()) {
      const existingCategory = await Category.findOne({
        _id: { $ne: req.params.categoryId },
        $or: [
          { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } },
          {
            slug: name
              .toLowerCase()
              .replace(/[^a-zA-Z0-9\s]/g, "")
              .replace(/\s+/g, "-")
              .trim(),
          },
        ],
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Category name already exists",
          error: true,
          success: false,
        });
      }
    }

    category.name = name.trim();
    category.description = description?.trim() || "";
    if (typeof isActive === "boolean") {
      category.isActive = isActive;
    }

    const updatedCategory = await category.save();

    return res.status(200).json({
      category: updatedCategory,
      message: "Category updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

// Delete category (admin only)
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    // Check if category is being used by posts
    const Post = require("../models/postModel");
    const postsCount = await Post.countDocuments({
      category: category.name.toLowerCase(),
    });

    if (postsCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. It is being used by ${postsCount} post(s). Please reassign or delete those posts first.`,
        error: true,
        success: false,
      });
    }

    await Category.findByIdAndDelete(req.params.categoryId);

    return res.status(200).json({
      message: "Category deleted successfully",
      error: false,
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
