const express = require("express");
const cors = require("cors")
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes")
const staffRoutes = require("./routes/staffRoutes");
const complaintRoutes = require("./routes/complaintRoutes")

const app = express();

    app.use(express.json());
    app.use(cors({
    origin: true,
    credentials: true
}));
    app.use(cookieParser());

    

    app.use("/api/v1/auth",authRoutes)   
    app.use("/api/v1/admin", adminRoutes) 
    app.use("/api/v1/staff",staffRoutes)
    app.use("/api/v1/complaints",complaintRoutes)
    

    module.exports = app;