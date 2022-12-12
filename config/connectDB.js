const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    try {
       const conn = await mongoose.connect("mongodb://127.0.0.1:27017/expensesApp",{
        useUnifiedTopology:true,
        useNewUrlParser:true
       })
       console.log(`mongodb is connected ${conn.connection.host}`.bgCyan.white); 

    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

module.exports = connectDB;