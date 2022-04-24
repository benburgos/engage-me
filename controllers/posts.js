// Import
const express = require('express');
const Post = require('../models/post');
const postSeed = require('../models/postSeed')

const router = express.Router();

// Index Route
router.get('/', async (req, res) => {
    const posts = await Post.find({}).catch((err) => res.send(err));
    res.render('index.ejs', { posts });
});

// Seed Route
router.get('/seed', async (req, res) => {
    await Post.remove({}).catch((err) => res.send(err));
    const posts = await Post.create(postSeed).catch((err) => res.send(err));
    res.json(posts);
});

// New Route
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Delete Route
router.delete('/:id', (req, res) => {
    console.log(`--Delete Route Accessed--`)
});

// Update Route
router.put('/:id', (req, res) => {
    console.log(`--Update Route Accessed--`)
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
router.get('/:id', (req, res) => {
    res.send(`You made it to the detail page for ${req.params.id}`)
});

module.exports = router;