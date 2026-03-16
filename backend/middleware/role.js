
exports.userAuthorize = (requiredRoles) =>{
    return (req,res,next) =>{
        try {
            const {userRole} = req;

            if(!requiredRoles.includes(userRole)){
                return res.status(403).json({
                    success:false,
                    message:"Unauthorized access"
                })
            }
            next()
        } catch (error) {
            return res.status(403).json({
                success:false,
                message:error.message
            })
        }
    };

};