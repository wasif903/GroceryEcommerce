const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/userAuth');
const shopAuthRoute = require('./routes/shopAuth')

require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/shop', shopAuthRoute);

connectToMongo();



app.listen(process.env.CONNECTION_PORT, function (err) {
    console.log('Connected to MongoDB successfully');
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.CONNECTION_PORT);
});


