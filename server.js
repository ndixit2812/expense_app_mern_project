const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/connectDB')

// config the env file
dotenv.config();

// database calling
connectDB();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes

// 1.user routes
app.use('', require('./routes/userRoute'))

// 2.transaction routes
app.use('', require('./routes/transactionRoute'))

// port
const PORT = 8080 || process.env.PORT

// listen server
app.listen(PORT, () => {
    console.log(`Server is running at the ${PORT}`)
})