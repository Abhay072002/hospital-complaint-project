import React, { useEffect, useState } from "react";
import api from "../../axios/instance";
import { Badge, Button, Container, Table } from "react-bootstrap";
import ReassignTaskModal from "../components/ReassignTaskModal";

const TaskManagement = () => {
  const [task, setTask] = useState([]);
  const [reassigningStaff,setReassigningStaff] = useState(false);
  const [selectedTask,setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/admin/tasks");
      setTask(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleReassign = (task) =>{
    setSelectedTask(task)
    setReassigningStaff(true);
  };

   const handleDelete = async (taskId) => {
    try {
      await api.delete(`/admin/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "80vh" }}>
      <Container >
      <div className=" d-flex justify-content-between py-3">
        <h2>Task Management</h2>
      </div>
      <Table hover responsive bordered>
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Time</th>
            <th>Assigned To</th>
            <th>Assigned By</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {task.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>
                <Badge
                  bg={
                    task.priority === "High"
                      ? "danger"
                      : task.priority === "Medium"
                        ? "warning"
                        : "success"
                  }
                >
                  {task.priority}
                </Badge>
              </td>
              <td>
                <Badge
                  bg={
                    task.status === "Pending"
                      ? "secondary"
                      : task.status === "In Progress"
                        ? "primary"
                        : "success"
                  }
                >
                  {task.status}
                </Badge>
              </td>
              <td>
                {new Date(task.dueTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>{task.assignedTo?.fullName}</td>
              <td>{task.assignedBy?.fullName}</td>
              <td>
                <Button
                size="sm"
                variant="warning"
                onClick={()=>handleReassign(task)}
                >
                    Reassign
                </Button>
              </td>
              <td>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ReassignTaskModal
  show={reassigningStaff}
  onHide={() => setReassigningStaff(false)}
  onSuccess={fetchTasks}
  task={selectedTask}
/>
    </Container>
    </div>
    
  );
};

export default TaskManagement;
