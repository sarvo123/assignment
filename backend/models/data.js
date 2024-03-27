const mongoose  = require("mongoose");

const interviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    date : String , 
    time : String, 
    day : String , 
})

const Interview = mongoose.model('Interview' , interviewSchema);

module.exports = Interview ; 