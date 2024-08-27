const express = require('express');

const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');

const verifyUser = require('../middleware/verifyUser');
const router = express.Router();

router.post('/createPost', verifyUser, createPost);
router.get('/getAllPosts', getPosts);
router.put('/update/:postId', verifyUser, updatePost);
router.delete('/delete/:postId', verifyUser, deletePost);

module.exports = router;
