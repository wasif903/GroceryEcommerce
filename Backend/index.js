const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/AuthRoutes/userAuth');
const authMiddleware = require('./middlewares/authMiddleware');
const categoryRoute = require('./routes/categoryCRUD');
const subcategoryRoute = require('./routes/subCategoryCRUD');
const storeRoute = require('./routes/AuthRoutes/storeAuth');
const productRoute = require('./routes/productCRUD');


require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/store',storeRoute);
app.use('/category', categoryRoute);
app.use('/subcategory', subcategoryRoute);
app.use('/product', productRoute);


app.get('/hello', authMiddleware, (req, res) => {
    res.send("Admin Route");
})



connectToMongo();



app.listen(process.env.CONNECTION_PORT, function (err) {
    console.log('Connected to MongoDB successfully');
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.CONNECTION_PORT);
});


