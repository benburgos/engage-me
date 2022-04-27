// Dependency Import
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const PostRouter = require('./controllers/posts');

// Create Express Application
const app = express();

// Middleware
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Routers
app.use('/posts', PostRouter);

// Index Reroute
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`You're connected on port ${PORT}!`)});