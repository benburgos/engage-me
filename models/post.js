// Import Dependencies
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Post Schema
const postSchema = new Schema(
    {
        feedbackType: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        postCreated: { type: Date, default: Date() },
        lastEdit: { type: Date, default: Date() },
        upVotes: Number,
        comments: { type: String }
    }
);

// Post Model
const Post = model('Post', postSchema);

module.exports = Post;