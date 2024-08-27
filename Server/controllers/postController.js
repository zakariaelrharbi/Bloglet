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
        userId: req.user.id,
        slug,
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

const getPosts = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

module.exports = {createPost, getPosts, updatePost, deletePost};
