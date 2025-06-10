const mongoose = require("mongoose");


const mongoDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in environment variables.");
        throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB")
    })
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/super-image-ai`, {})
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message)
        throw err;
    }
}

module.exports = mongoDB