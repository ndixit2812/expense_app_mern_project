const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
   userid:{
    type:String,
    require:true
   },
    amount:{
    type:Number,
    require:[true,'amount is required']
   },
   type:{
    type:String,
    require:[true,'type is required']
   },
   category:{
    type:String,
    require:[true,'category is required']
   },
   refrence:{
    type:String
   },
   description:{
    type:String,
    require:[true,'desc is required']
   },
   date:{
    type:Date,
    require:[true,'date is required']
   }
},{timestamps:true})

const transactionModel = mongoose.model('tranzenxtions', transactionSchema)

module.exports = transactionModel