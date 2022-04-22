// Import Dependencies
require('dotenv').config();
const mongoose = require('mongoose');

// DB Config
const DATABASE_URL = process.env.DATABASE_URL
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect to DB
mongoose.connect(DATABASE_URL, config)

// Status Messages
mongoose.connection
    .on('open', () => console.log('Connected to database!'))
    .on('close', () => console.log('Disconnected from database!'))
    .on('error', (err) => console.log(err));

module.exports = mongoose;