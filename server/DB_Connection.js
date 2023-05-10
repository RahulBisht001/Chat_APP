const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })

// mongoose.set('strictQuery', true)
const DBConnection = async () => {
    try {
        const DB_URI = process.env.DBURI.replace('<PASSWORD>', process.env.DBPASSWORD)

        const con = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
            // useCreateIndex: true
        })
        console.log(`DataBase Connected Successfully : ${con.connection.host}`)
    }
    catch (err) {
        console.log(err)
        console.log("DataBase Connection Error hai Bhaiya")
        process.exit(1)
    }
}

module.exports = DBConnection