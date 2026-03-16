const Task = require("../models/taskModel");
const taskId = require("../models/taskModel");
const Complaint = require("../models/complaintModel");

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId })
      .populate("assignedBy", "fullName employeeId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }
    if (!["In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this task",
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { proofImage } = req.body;

    if (!proofImage) {
      return res.status(400).json({
        success: false,
        message: "Please provide proof image",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to complete this task",
      });
    }

    task.status = "Completed";
    await task.save();

    const complaint = await Complaint.findOne({
      complaintId: task.complaintId,
    });

    if (complaint) {
      complaint.status = "Completed";
      complaint.proofImage = proofImage;
      await complaint.save();
    }

    res.status(200).json({
      success: true,
      message: "Task completed and complaint updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
