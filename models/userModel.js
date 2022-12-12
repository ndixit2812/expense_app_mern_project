const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       name:{
        type:String,
        require:[true, 'name is require']
       },
       email:{
        type:String,
        require:[true, 'email is require and should be unique'],
        unique:true
       },
       password:{
        type:String,
        require:[true, 'password is require']
       }
},{timestamps: true }
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel