const connectToMongo = require('./db');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/AuthRoutes/userAuth');
const shopAuthRoute = require('./routes/AuthRoutes/shopAuth')
const SuperAdminRoutes = require('./routes/AuthRoutes/SuperAdmin')
const ShopAdminAuth = require('./middlewares/ShopAdminAuth');
const ShopManagerAuth = require('./middlewares/ShopManagerAuth');
const ShopEmployeeAuth = require('./middlewares/ShopEmployeeAuth')
const SuperAdminAuth = require('./middlewares/SuperAdminAuth')


require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/shop', shopAuthRoute);
app.use('/superAdmin', SuperAdminRoutes);


app.get('/hello', ShopAdminAuth, (req, res) => {
    res.send("Admin Route");
})
app.get('/hello2', ShopManagerAuth, (req, res) => {
    res.send("Manager Route");
})
app.get('/hello3', ShopEmployeeAuth, (req, res) => {
    res.send("Employee Route");
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


