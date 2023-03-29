const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/userAuth');
const shopAuthRoute = require('./routes/shopAuth')
const ShopAdminAuth = require('./middlewares/ShopAdminAuth');

require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/shop', shopAuthRoute);


app.get('/hello', ShopAdminAuth, (req, res) => {
    res.send("Authorization Done");
})


connectToMongo();



app.listen(process.env.CONNECTION_PORT, function (err) {
    console.log('Connected to MongoDB successfully');
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.CONNECTION_PORT);
});


