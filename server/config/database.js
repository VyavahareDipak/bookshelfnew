const mongoose = require("mongoose");

require("dotenv").config();
dbconnect =()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("db connection successful")
    })
    .catch((err)=>{
        console.log(`got an error :{err}`)
    })
    // process.exit(1);
 
}

module.exports = dbconnect ;