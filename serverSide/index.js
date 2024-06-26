require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE).then(() =>
    console.log('Database connected.')
    ).catch((e) =>
    console.log('Database not connected.\n', e)
)

//Routers

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin : true, credentials: true
    }
))


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`the server is running on port : ${port}`)
})

module.exports = app