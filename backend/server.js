const dotenv = require("dotenv");
const app = require("./app");
const databaseConnection = require("./config/databaseConnection");

    if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

    databaseConnection();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () =>{
        console.log(`server is running on ${PORT}`);
        
    })