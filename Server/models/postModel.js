const mongoose = require('mongoose');
const { use } = require('../routes/postRoutes');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png',
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;