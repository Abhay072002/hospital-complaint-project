const mongoose = require("mongoose");

const databaseConnection = async () =>{
    try{
        const connection = await mongoose.connect(process.env.DB_URI);

        console.log(`Database is connected with ${connection.connection.host}`);

    } 
    catch(error){
        console.error(error.message);
         process.exit(1);
    }
};

module.exports = databaseConnection