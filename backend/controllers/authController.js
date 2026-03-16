const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req,res) =>{
try {
    const {employeeId,password} = req.body;
    if(!employeeId || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide Employee ID and password"
        })
    };
    const user = await User.findOne({employeeId}).select("+password");

    if(!user){
        return res.status(401).json({
            success:false,
            message:"invalid EmployeeId or password"
        })
    }
    if(!user.isActive){
        return res.status(403).json({
            success:false,
            message:"Your account has been deactivated"
        })
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"invalid EmployeeId or password"
        })
    }

    const token = jwt.sign(
        {id:user._id, role:user.role},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    );
   res.status(200)
    .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })
    .json({
        success: true,
        user: {
            id: user._id,
            fullName: user.fullName,
            employeeId: user.employeeId,
            role: user.role
        }
    });
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    });
}
    
};
exports.userLogout = async (req,res) =>{
    try {
        res.status(200).clearCookie("token").json({
            success:true,
            message:"Logged out Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

    
