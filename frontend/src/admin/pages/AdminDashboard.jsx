import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../axios/instance";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,
  LinearScale,
  BarElement } from "chart.js";
import {  Bar } from "react-chartjs-2";

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const fetchData = async () =>{
            try {
                const res = await api.get("/admin/dashboard")
                setStats(res.data)
            } catch (error) {
                console.log(error);  
            }
    }

    useEffect(() => {
      fetchData();
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
);

    const taskChartData = {
  labels: ["Pending", "In Progress", "Completed"],
  datasets: [
    {
      data: [stats.pendingTasks, stats.inProgressTasks, stats.completedTasks],
      backgroundColor: ["#ffc107", "#0dcaf0", "#198754"],
      borderColor: ["#fff", "#fff", "#fff"],
      borderWidth: 2,
    },
  ],
};
const staffChartData = {
  labels: ["Total Staff", "Active Staff", "Total Tasks", "High Priority", "Overdue"],
  datasets: [
    {
      label: "Count",
      data: [stats.totalStaff, stats.activeStaff, stats.totalTasks, stats.highPriorityTasks, stats.overdueTasks],
      backgroundColor: ["#0367fd", "#198754", "#6f42c1", "#fd7e14", "#dc3545"],
    },
  ],
};

  return (
    <div style={{ backgroundColor: "rgb(240, 244, 248)", minHeight: "80vh" }}>
        <Container className=" py-3">
        <div>
          <h1 className=" fw-bold">Dashboard</h1>
        </div>
        <Row className=" m-4 g-3">
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center " style={{ borderLeft: "4px solid rgb(13, 110, 253)"}}>
              <h2 className=" fw-bold text-primary">{stats.totalStaff}</h2>
              <p className=" text-muted">Total Staff</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3  shadow-sm text-center" style={{ borderLeft: "4px solid #rgb(42, 255, 70)"}}>
              <h2 className=" fw-bold text-success">{stats.activeStaff}</h2>
              <p className=" text-muted">Active Staff</p>
            </Card>
          </Col>{" "}
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid #rgb(253, 181, 13)"}}>
              <h2 className=" fw-bold"style={{color:"#rgb(238, 139, 39)"}}>{stats.totalTasks}</h2>
              <p className=" text-muted">Total Tasks</p>
            </Card>
          </Col>{" "}
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid rgb(237, 253, 13)"}}>
              <h2 className=" fw-bold text-warning">{stats.pendingTasks}</h2>
              <p className=" text-muted">Pending Tasks</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid rgb(13, 253, 241)"}}>
              <h2 className=" fw-bold text-info">{stats.inProgressTasks}</h2>
              <p className=" text-muted">In Progress Tasks</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center"style={{ borderLeft: "4px solid rgb(0, 255, 94)"}}>
              <h2 className=" fw-bold text-success">{stats.completedTasks}</h2>
              <p className=" text-muted">Completed Tasks</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid rgb(253, 13, 13)"}}>
              <h2 className=" fw-bold" style={{color:"#rgb(253, 20, 20)"}}>{stats.highPriorityTasks}</h2>
              <p className=" text-muted">High Priority Tasks</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center" style={{ borderLeft: "4px solid rgb(220, 53, 69)"}}>
              <h2 className=" fw-bold text-danger">{stats.overdueTasks}</h2>
              <p className=" text-muted">Overdue Tasks</p>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
  <Col md={6}>
    <Card className="p-4 shadow-sm  mt-5">
      <h5 className="fw-bold mb-3">Task Status Overview</h5>
      <Pie data={taskChartData} />
    </Card>
  </Col>
  <Col md={6}>
  <Card className="p-4 shadow-sm border-0 mt-5">
    <h5 className="fw-bold mb-3">Hospital Overview</h5>
    <Bar data={staffChartData} />
  </Card>
</Col>
</Row>
         </Container>
    </div>
  )
}

export default AdminDashboard