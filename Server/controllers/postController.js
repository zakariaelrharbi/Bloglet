const Post = require('../models/postModel');

const createPost = async (req, res) => {
    const {title, content} = req.body;
    if (!title || !content ) {
        return res.status(400).json({
            message: 'Please fill in all fields',
            error: true,
            success: false
        });
    }
    const slug = req.body.title
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const post = await newPost.save();
        return res.status(201).json({
            post,
            message: 'Post created successfully',
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.category && { category: req.query.category }),
          ...(req.query.slug && { slug: req.query.slug }),
          ...(req.query.postId && { _id: req.query.postId }),
          ...(req.query.serchTerm && {
            $or: [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPost = await Post.countDocuments();
        const now = new Date();
        
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        return res.status(200).json({
            posts,
            totalPost,
            lastMonthPosts,
            message: 'Posts fetched successfully',
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

module.exports = {createPost, getPosts, updatePost, deletePost};