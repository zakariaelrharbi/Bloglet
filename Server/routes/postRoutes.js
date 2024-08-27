const express = require('express');

const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');

const verifyUser = require('../middleware/verifyUser');
const router = express.Router();

router.post('/createPost', verifyUser, createPost);
router.get('/getAllPosts', getPosts);
router.get('/:postId', getPost);
router.put('/update/:postId', verifyUser, updatePost);
router.delete('/delete/:postId', verifyUser, deletePost);

module.exports = router;
