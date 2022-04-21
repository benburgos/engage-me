require('dotenv').config();

// Dependency Import
const express = require('express');
const app = express();

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`You're connected on port ${PORT}!`)})