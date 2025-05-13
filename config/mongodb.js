const mongoose = require("mongoose");


const mongoDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB")
    })
    console.log("string",process.env.MONGODB_URI)
    await mongoose.connect(`${process.env.MONGODB_URI}/super-image-ai`, {})
}

module.exports = mongoDB