const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

require('dotenv').config();

app.use(express.json());

// app.use('/auth', authRoute);

const db = connectToMongo();

db.on('error', (error) => {
    console.error('Failed to connect to MongoDB:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
    app.listen(process.env.CONNECTION_PORT, function(err){
        if (err) console.log("Error in server setup")
        console.log("Server listening on Port", process.env.CONNECTION_PORT);
    });
});
