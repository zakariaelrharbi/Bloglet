const path = require("path");
const fs = require("fs");

const Post = require("../models/postModel");

const generateUniqueSlug = async (title) => {
  const baseSlug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = baseSlug || "post";
  let suffix = 0;

  while (await Post.exists({ slug })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
};

const createPost = async (req, res) => {
  const title = req.body.title?.trim();
  const content = req.body.content;
  const category = req.body.category || "uncategorized";

  if (!title || !content) {
    return res.status(400).json({
      message: "Please fill in all fields",
      error: true,
      success: false,
    });
  }

  const slug = await generateUniqueSlug(title);

  let imagePath = null;
  if (req.file) {
    imagePath = `uploads/${req.file.filename}`;
  }

  const newPost = new Post({
    title,
    content,
    category,
    image: imagePath,
    slug,
    userId: req.user.id,
  });

  try {
    const post = await newPost.save();
    return res.status(201).json({
      post,
      message: "Post created successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    if (error.code === 11000) {
      const duplicatedField =
        Object.keys(error.keyValue || {}).join(", ") || "field";
      return res.status(400).json({
        message: `Duplicate ${duplicatedField} already exists`,
        error: true,
        success: false,
      });
    }
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    // Fetch posts with author details populated
    const posts = await Post.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate("author", "name"); // Populate author field with 'name' field

    const totalPost = await Post.countDocuments(query);
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      posts,
      totalPost,
      lastMonthPosts,
      message: "Posts fetched successfully",
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

const updatePost = async (req, res) => {
  try {
    // Check if user is authorized
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
        success: false,
      });
    }

    if (req.user.id !== post.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        error: true,
        success: false,
      });
    }

    // Handle image update
    let imagePath = post.image;
    if (req.file) {
      // Delete old image if exists and is a local file
      if (post.image && post.image.startsWith("uploads/")) {
        const oldImagePath = path.join(__dirname, "../" + post.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = `uploads/${req.file.filename}`;
    } else if (req.body.image && req.body.image !== post.image) {
      imagePath = req.body.image;
    }

    const updatePayload = {};
    if (typeof req.body.title === "string" && req.body.title.trim()) {
      updatePayload.title = req.body.title.trim();
    }
    if (typeof req.body.content === "string") {
      updatePayload.content = req.body.content;
    }
    if (typeof req.body.category === "string") {
      updatePayload.category = req.body.category;
    }
    updatePayload.image = imagePath;

    if (
      updatePayload.title &&
      updatePayload.title !== post.title
    ) {
      updatePayload.slug = await generateUniqueSlug(updatePayload.title);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      updatePayload,
      { new: true },
    );

    return res.status(200).json({
      post: updatedPost,
      message: "Post updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    if (error.code === 11000) {
      const duplicatedField =
        Object.keys(error.keyValue || {}).join(", ") || "field";
      return res.status(400).json({
        message: `Duplicate ${duplicatedField} already exists`,
        error: true,
        success: false,
      });
    }
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const deletePost = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
      error: true,
      success: false,
    });
  }
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        error: true,
        success: false,
      });
    }

    if (post.image && post.image.startsWith("uploads/")) {
      const imagePath = path.join(__dirname, "../" + post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      message: "Post deleted successfully",
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

module.exports = { createPost, getPosts, updatePost, deletePost };
