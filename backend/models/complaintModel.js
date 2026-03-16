const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        complaintId:{
            type:String,
            unique:true
        },
            fullName:{
                type:String,
                required:true
            },
            phone:{
                type:String,
                required:true
            },
            location:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
            status:{
                type:String,
                enum:["Pending","Assigned","Completed","Rejected"],
                default:"Pending"
            },
            assignedStaff:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            proofImage:{
                type:String
            } 
    },
    {
        timestamps:true
    }
);

const Complaint = mongoose.model("Complaint" ,complaintSchema);

module.exports = Complaint;