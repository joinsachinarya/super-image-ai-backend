const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoDB = require("./config/mongodb")



const app = express()
dotenv.config()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors({
    origin: "*"
}))
async function callDB() {
    await mongoDB()
}
callDB()

app.get("/", (req, res) => {
    res.send("I'm rich")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})