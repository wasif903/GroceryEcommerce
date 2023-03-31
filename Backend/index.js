const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/AuthRoutes/userAuth');
const SuperAdminRoutes = require('./routes/AuthRoutes/SuperAdmin')
const authMiddleware = require('./middlewares/authMiddleware');
const SuperAdminAuth = require('./middlewares/SuperAdminAuth')
const categoryRoute = require('./routes/categoryCRUD');
const subcategoryRoute = require('./routes/subCategoryCRUD');


require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/superAdmin', SuperAdminRoutes);
app.use('/category', categoryRoute);
app.use('/subcategory', subcategoryRoute);


app.get('/hello', authMiddleware, (req, res) => {
    res.send("Admin Route");
})


app.get('/hello4', SuperAdminAuth, (req, res) => {
    res.send("Super Admin Route");
})


connectToMongo();



app.listen(process.env.CONNECTION_PORT, function (err) {
    console.log('Connected to MongoDB successfully');
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.CONNECTION_PORT);
});


