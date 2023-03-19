const mongoose = require('mongoose');

const connectToMongo = () => {
    return mongoose.createConnection(process.env.MONGO_URI, (error) => {
        if (error) {
            console.error('Failed to connect to MongoDB:', error);
        } else {
            console.log('Connected to MongoDB successfully');
        }
    });
};

module.exports = connectToMongo;
