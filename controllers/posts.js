// Import
const express = require('express');
const Post = require('../models/post');
const postSeed = require('../models/postSeed')

const router = express.Router();

// Index Route
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// Seed Route
router.get('/seed', (req, res) => {
    Post.deleteMany({}, (err, deletedPosts) => {
        Post.create(postSeed, (err, data) => {
            res.redirect('/posts')
        })
    })
})

// New Route
router.get('/new', (req, res) => {
    res.send('You made it to the new post page!');
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
router.post('/', (req, res) => {
    console.log(`--Create Route Accessed--`)
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