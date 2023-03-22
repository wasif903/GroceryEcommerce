const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://wasif:kingofnoobs@cluster0.fmaocsf.mongodb.net/test"
const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI, { useNewUrlParser: true })
        console.log("DB Connected");
    } catch (error) {
        console.log(error, "in Connection");
        
    }
}
module.exports = connectToMongo;