const Complaint = require("../models/complaintModel");

exports.createComplaint = async (req,res) =>{
    try {
        const {fullName,phone,location,description} = req.body;

        if(!fullName || !phone || !location || !description){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            })
        }

        const complaintId = "CMP" +  Date.now();
        const complaint = await Complaint.create({
            complaintId,
            fullName,
            phone,
            location,
            description
        });

        res.status(201).json({
            success:true,
            message:"Complaint submitted Successfully",
            complaintId:complaint.complaintId
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.trackComplaint = async (req, res) => {
    try {
        const { query } = req.params;

        const complaints = await Complaint.find({ 
            $or :[ 
                {complaintId:query},
                {phone:query}
            ]
         });

        if (!complaints || complaints.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

       res.status(200).json({
            success: true,
            complaints: complaints.map((complaint) => ({
                complaintId: complaint.complaintId,
                description: complaint.description,
                status: complaint.status,
                assignedStaff: complaint.assignedStaff
            }))
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}