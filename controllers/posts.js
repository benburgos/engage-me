// Import
const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// Index Route
router.get('/', (req, res) => {
    res.render('index.ejs');
});

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