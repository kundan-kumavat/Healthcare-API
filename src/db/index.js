const mongoose = require('mongoose');
const {DB_NAME} = require('../constants.js');

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n Mongo DB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;