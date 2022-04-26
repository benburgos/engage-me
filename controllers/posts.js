// Import
const express = require('express');
const Post = require('../models/post');
const postSeed = require('../models/postSeed')

const router = express.Router();

// Index Route
router.get('/', async (req, res) => {
    const posts = await Post.find({}).sort([['upVotes', 'descending']]).catch((err) => res.send(err));
    res.render('index.ejs', { posts });
});

// Seed Route
router.get('/seed', async (req, res) => {
    await Post.remove({}).catch((err) => res.send(err));
    const posts = await Post.create(postSeed).catch((err) => res.send(err));
    res.redirect('/posts');
});

// New Route
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Delete Route
router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id).catch((err) => res.send(err));
    res.redirect('/posts');
});

// Delete Route -- Comments
router.delete('/:id/comments/:cid', async (req, res) => {
    const post = await Post.findById(req.params.id);
    const commentIndex = post.comments.findIndex(obj => obj.id === req.params.cid);
    post.comments.splice(commentIndex, 1);
    await post.save();
    res.redirect(`/posts/${req.params.id}`);
})

// Update Route
router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body).catch((err) => res.send(err));
    await post.save();
    res.redirect(`/posts/${req.params.id}`);
});

// Update Route -- Upvotes
router.put('/upvote/:id', async (req, res) => {
    const post = await Post.findById(req.params.id, req.body).catch((err) => res.send(err));
    post.upVotes += 1;
    await post.save();
    res.redirect('/posts');
});

// Update Route -- Comments
router.put('/:id/comments/:cid', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});
    const commentIndex = post.comments.findIndex(obj => obj.id === req.params.cid);
    post.comments[commentIndex] = req.body;
    await post.save();
    res.redirect(`/posts/${req.params.id}`);
})

// Create Route
router.post('/', async (req, res) => {
    await Post.create(req.body).catch((err) => res.send(err));
    res.redirect('/posts');
});

// Create Route -- Comments
router.post('/:id', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});
    post.comments.push(req.body);
    await post.save();
    res.redirect(`/posts/${req.params.id}`);
})

// Edit Route
router.get('/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id).catch((err) => res.send(err));
    res.render('edit.ejs', { post });
});

// Edit Route - Comments
router.get('/:id/comments/:cid/edit', async (req, res) => {
    const post = await Post.findById(req.params.id).catch((err) => res.send(err));
    res.render('edit-comment.ejs', { post: post, commentId: req.params.cid });
})

// Show Route
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).catch((err) => res.send(err));
    res.render('show.ejs', { post });
});

module.exports = router;