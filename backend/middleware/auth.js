const jwt = require("jsonwebtoken");



exports.userAuth = (req,res,next) =>{
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please login to access this resource"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.id;
        req.userRole = decode.role;

        next();
        
    } catch (error) {
        return res.status(401).clearCookie("token").json({
            success:false,
            message:error.message
        });
    }
};