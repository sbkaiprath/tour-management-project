const express = require('express')
const dotenv = require("dotenv")
const logger = require('morgan')
const connectDb = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger('dev'))

//connect to data base
connectDb()

//connecting route files
const trending = require('./routes/trending')


//mounting route
app.use('/trending', trending);

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} on PORT ${PORT}`))
    //Handling unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error:${error.message}`);

    //Close the server and exit process
    server.close(() => process.exit(1));
})