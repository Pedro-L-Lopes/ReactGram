const mongoose = require("mongoose")
const dbUser = process.env.DB_USER
const dbPassWord = process.env.DB_PASS

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassWord}@cluster0.zeqelhi.mongodb.net/?retryWrites=true&w=majority`
        ) 

        console.log("Connected")

        return dbConn
    } catch (error) {
        console.log(error)
        console.log("Failed to connect")
    }
}

conn()

module.exports = conn
