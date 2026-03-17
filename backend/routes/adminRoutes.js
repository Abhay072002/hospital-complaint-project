const express = require("express");
const { userAuth } = require("../middleware/auth");
const { userAuthorize } = require("../middleware/role");
const { createStaff, createTask, getAllStaff, getAllTasks, reassignTask, getDashboardStatus, getAllComplaints, assignComplaint, deleteTask, deleteStaff } = require("../controllers/adminController");
const router = express.Router();

router.post(
    "/create-staff",
    userAuth,
    userAuthorize(["admin"]),
    createStaff
);

router.post(
    "/create-task",
    userAuth,
    userAuthorize(["admin"]),
    createTask
);

router.get(
    "/staff",
    userAuth,
    userAuthorize(["admin"]),
    getAllStaff
);

router.get(
    "/tasks",
    userAuth,
    userAuthorize(["admin"]),
    getAllTasks
);
router.patch(
    "/reassign-task/:taskId",
    userAuth,
    userAuthorize(["admin"]),
    reassignTask
);
router.get(
    "/dashboard",
    userAuth,
    userAuthorize(["admin"]),
    getDashboardStatus
);
router.get(
    "/all-complaints",userAuth,
    userAuthorize(["admin"]),
    getAllComplaints
);
router.patch(
    "/assign-complaint/:complaintId",
    userAuth,
    userAuthorize(["admin"]),
    assignComplaint
)

router.delete(
    "/tasks/:taskId",
    userAuth,
    userAuthorize(["admin"]),
    deleteTask
);



router.delete(
    "/staff/:staffId",
    userAuth,
    userAuthorize(["admin"]),
    deleteStaff
);
module.exports =router;