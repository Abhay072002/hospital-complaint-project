const express = require("express");
const router = express.Router();

const {userAuth} = require("../middleware/auth");
const {userAuthorize} = require("../middleware/role");
const { getMyTasks, updateTaskStatus, completeTask } = require("../controllers/staffController");

router.get(
    "/my-tasks",
    userAuth,
    userAuthorize(["staff"]),
    getMyTasks
);

router.patch(
    "/update-task/:taskId",
    userAuth,
    userAuthorize(["staff"]),
    updateTaskStatus
);

router.patch(
    "/complete-task/:taskId",
    userAuth,
    userAuthorize(["staff"]),
    completeTask
)

module.exports = router