import { useState } from "react";
import api from "../../axios/instance";
import { useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/staff/my-tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);
  const pendingTasksCount = tasks.filter(
    (task) => task.status === "Pending",
  ).length;
  const inProgressTasksCount = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const handleStartTask = async (taskId) => {
    try {
      await api.patch(`/staff/update-task/${taskId}`, {
        status: "In Progress",
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.patch(`/staff/complete-task/${taskId}`, {
        proofImage: "completed",
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" overflow-hidden">
      <Container >
        <h3>My Tasks</h3>
        <p>Manage and track all your assigned tasks.</p>

        <div className=" d-flex gap-2 my-5">
          <Button
            className=" rounded border-1 ` "
            variant={filter === "All" ? "primary" : "outline-secondary"}
            onClick={() => setFilter("All")}
          >
            All {tasks.length}
          </Button>

          <Button
            className=" rounded border-1"
            variant={filter === "All" ? "primary" : "outline-secondary"}
            onClick={() => setFilter("Pending")}
          >
            Pending {pendingTasksCount}
          </Button>

          <Button
            className=" rounded border-1"
            variant={filter === "All" ? "primary" : "outline-secondary"}
            onClick={() => setFilter("In Progress")}
          >
            In Progress {inProgressTasksCount}
          </Button>

          <Button
            className=" rounded border-1"
            variant={filter === "All" ? "primary" : "outline-secondary"}
            onClick={() => setFilter("Completed")}
          >
            Completed {completedTasksCount}
          </Button>
        </div>

        <Row className=" g-3">
          {filteredTasks.map((task) => (
            <Col xs={12} sm={6} md={4}  key={task._id}>
              <Card className=" h-100 shadow-sm border-1 p-3">
                <div>
                <div className=" d-flex gap-2 mb-2">
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
                </div>

                <h6 className=" fw-bold">{task.title}</h6>
                <p className=" text-muted small">{task.description}</p>

                <p className=" small mb-3">
                  ⏱️ Due:
                  {new Date(task.dueTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {task.status === "Pending" && (
                  <Button
                    variant="primary"
                    className=" w-100"
                    onClick={() => handleStartTask(task._id)}
                  >
                    Start Task
                  </Button>
                )}

                {task.status === "In Progress" && (
                  <Button
                    variant="success"
                    className=" w-100"
                    onClick={() => handleCompleteTask(task._id)}
                  >
                    Mark Complete
                  </Button>
                )}

                {task.status === "Completed" && (
                  <Button variant="outline-secondary" className=" w-100">
                    Completed
                  </Button>
                )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyTasks;
