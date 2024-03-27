// Import dependencies ...
const mongoose = require('mongoose');

async function connectToDb(){
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log("Successfully connected to database ."); 
    }catch(error){
        console.log(error);
    }
    
}

module.exports = connectToDb;