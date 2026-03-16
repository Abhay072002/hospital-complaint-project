const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true , "Please enter fullname"],
        minlength: [2, "Fullname should contain min 2 characters"],
        maxlength: [30, "Fullname doesn't exceed max 30 characters"],
        trim: true
    },
    employeeId:{
         type:String,
        required:[true , "Please enter Employee ID"],
        unique:true,
        trim: true
    },
    password:{
         type:String,
        required:[true, "Please enter password"],
        minlength: [2, "Password should contain min 2 characters"],
        select: false
    },
    role:{
         type:String,
         enum: ["admin" ,"staff"],
        required:true
    },
    department:{
         type:String,
         trim: true
    },
    shift:{
         type:String,
         enum: ["Morning" ,"Evening" , "Night"]
    },
    isActive:{
         type:Boolean,
        default:true
    }

},{
        timestamps:true
    }
);

userSchema.pre("save" ,async function(next) {
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
    
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User" ,userSchema);

module.exports = User;