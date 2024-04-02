const mongoose = require("mongoose");

// monsgoose.connect returns a promise
const connectDB = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDB;



