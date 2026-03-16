const User = require("../models/userModel");
const Task = require("../models/taskModel");
const Complaint = require("../models/complaintModel");

exports.createStaff = async (req, res) => {
  try {
    const { fullName, employeeId, password, department, shift } = req.body;

    if (!fullName || !employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const existingUser = await User.findOne({ employeeId });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }
    const staff = await User.create({
      fullName,
      employeeId,
      password,
      role: "staff",
      department,
      shift,
    });
    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: {
        id: staff._id,
        fullName: staff.fullName,
        employeeId: staff.employeeId,
        department: staff.department,
        shift: staff.shift,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority } = req.body;
    if (!title || !assignedTo || !priority) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const staff = await User.findById(assignedTo);

    if (!staff || staff.role !== "staff") {
      return res.status(400).json({
        success: false,
        message: "Assigned user must be a valid staff member",
      });
    }

    let dueTime;

    if (priority == "High") {
      dueTime = new Date(Date.now() + 60 * 60 * 1000);
    } else {
      dueTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.userId,
      priority,
      dueTime,
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllStaff = async (req, res) => {
  try {
    const staffUsers = await User.find({ role: "staff" }).select("-password");

    res.status(200).json({
      success: true,
      staff: staffUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "fullName employeeId department shift")
      .populate("assignedBy", "fullName employeeId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.reassignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Please provide staff ID",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const staff = await User.findById(assignedTo);

    if (!staff || staff.role !== "staff") {
      return res.status(400).json({
        success: false,
        message: "Assigned user must be a valid staff member",
      });
    }

    task.assignedTo = assignedTo;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task reassigned successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getDashboardStatus = async (req, res) => {
  try {
    const totalStaff = await User.countDocuments({ role: "staff" });
    const activeStaff = await User.countDocuments({
      role: "staff",
      isActive: true,
    });

    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const inProgressTasks = await Task.countDocuments({ status: "In Progress" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const highPriorityTasks = await Task.countDocuments({ priority: "High" });
    const overdueTasks = await Task.countDocuments({
      dueTime: { $lt: new Date() },
      status: { $ne: "Completed" },
    });
    res.status(200).json({
      success: true,
      message: "Dashboard",
      totalStaff,
      activeStaff,
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      highPriorityTasks,
      overdueTasks,
    });
  } catch (error) {
     res.status(500).json({
            success: false,
            message: error.message
        });
  }
};
exports.getAllComplaints = async (req,res)=>{
  try {
    const complaints = await Complaint.find()
    .populate("assignedStaff", "fullName employeeId department")
    .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      complaints
    })
  } catch (error) {
    res.status(500).json({
      status:false,
      message:error.message
    })
  }
};
exports.assignComplaint = async (req,res) =>{
  try {
    const {complaintId} = req.params;
    const {assignedTo} =req.body;

    if(!assignedTo){
      return res.status(400).json({
        success:false,
        message:"Please provide staff ID"
      })
    }
    const complaint = await Complaint.findOne({complaintId})
    if(!complaint){
      return res.status(404).json({
        success:false,
        message:"Complaint not found"
      })
    }

    if(complaint.status !== "Pending"){
      return res.status(400).json({
        success:false,
        message:"Complaint already assigned or processed"
      })
    }

    const staff = await User.findById(assignedTo)
    if(!staff || staff.role !== "staff"){
      return res.status(400).json({
        success:false,
        message:"Invalid staff member"
      })
    }
    complaint.status = "Assigned";
    complaint.assignedStaff = assignedTo;
    await complaint.save();

    const priority = "Medium"

    let dueTime;
    dueTime = new Date(Date.now() +2*60*60*1000);

    const task = await Task.create({
      title:complaint.description,
      description:complaint.description,
      complaintId:complaint.complaintId,
      assignedTo,
      assignedBy:req.userId,
      priority,
      dueTime
    });

    res.status(200).json({
      success:true,
      message:"Complaint assigned and task created",
      complaint,
      task
    });
  } catch (error) {
    res.status(500).json({
            success: false,
            message: error.message
        });
  }
}
