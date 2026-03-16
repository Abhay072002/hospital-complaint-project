import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../axios/instance";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";

const StaffDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
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

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "80vh" }}>
      <Container className=" py-3">
        <div>
          <h3 className=" fw-bold">Welcome ,{user?.fullName} 👋</h3>
          <p className=" text-muted">
            Here's an overview of your tasks for today.
          </p>
        </div>
        <Row className=" m-4 g-3">
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center " style={{ borderLeft: "4px solid #0d6efd"}}>
              <h2 className=" fw-bold text-primary">{totalTasks}</h2>
              <p className=" text-muted">Total Tasks</p>
            </Card>
          </Col>{" "}
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid #fdfd0d"}}>
              <h2 className=" fw-bold" style={{color:"#eedd27"}}>{pendingTasks}</h2>
              <p className=" text-muted">Pending Tasks</p>
            </Card>
          </Col>{" "}
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid #0dedfd"}}>
              <h2 className=" fw-bold text-info">{inProgressTasks}</h2>
              <p className=" text-muted">In Progress Tasks</p>
            </Card>
          </Col>{" "}
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid #0dfd45"}}>
              <h2 className=" fw-bold text-success">{completedTasks}</h2>
              <p className=" text-muted">Completed Tasks</p>
            </Card>
          </Col>
        </Row>

        <div className=" mt-5 mb-5 pb bg-white p-4 rounded shadow-sm">
          <h5 className=" fw-bold mb-3">Recent Tasks</h5>
          <Table hover responsive>
            <thead >
              <tr>
                <th>Task Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Time</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 8).map((task) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default StaffDashboard;
