// Import Dependencies
const mongoose = require('./connection');
const {Schema, model} = mongoose;

// Post Schema
const postSchema = new Schema(
    {
        feedbackType: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        upVotes: { type: Number, default: 0},
        comments: [
            {
                type: new Schema(
                    {
                        comment: String
                    },
                    { timestamps: true }
                )
            }
        ],
    },
    {timestamps: true}
);

// Post Model
const Post = model('Post', postSchema);

module.exports = Post;