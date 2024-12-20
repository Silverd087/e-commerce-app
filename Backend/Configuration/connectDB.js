const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;

const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB Atlas Successfully");
    } catch (error) {
        console.log('Connection to MongoDB Failed', error);
    }
};
module.exports = connectDB;
