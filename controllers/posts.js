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

// Update Route
router.put('/:id', (req, res) => {
    console.log(`--Update Route Accessed--`)
});

// Upvote Route
router.put('/upvote/:id', async (req, res) => {
    const post = await Post.findById(req.params.id, req.body).catch((err) => res.send(err));
    post.upVotes += 1
    await post.save();
    res.redirect('/posts');
});

// Create Route
router.post('/', async (req, res) => {
    await Post.create(req.body).catch((err) => res.send(err));
    res.redirect('/posts')
});

// Edit Route
router.get('/:id/edit', (req, res) => {
    res.send(`You made it to the edit page for ${req.params.id}`)
});

// Show Route
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).catch((err) => res.send(err));
    res.render('show.ejs', { post });
});

module.exports = router;