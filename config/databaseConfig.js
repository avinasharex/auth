const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL

const databaseConnection = () => {
    mongoose.connect(MONGO_URL)
        .then((conn) => {
            console.log(`Connected to database ${conn.connection.host}`)
        }).catch((err) => {
            console.log(err.message);
        })
}

module.exports = databaseConnection