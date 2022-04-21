// Dependency Import
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Router
const PostRouter = require('./controllers/posts');
app.use('/posts', PostRouter)

// Index Reroute
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`You're connected on port ${PORT}!`)})