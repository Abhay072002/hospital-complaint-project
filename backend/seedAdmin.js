const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userModel");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.DB_URI)
    .then(async () => {
        console.log("Database connected");

        const existingAdmin = await User.findOne({ employeeId: "ADMIN001" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        await User.create({
            fullName: "Super Admin",
            employeeId: "ADMIN001",
            password: "123456",
            role: "admin",
            department: "Management",
            shift: "Morning"
        });

        console.log("Admin created successfully");
        process.exit();
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
