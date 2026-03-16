import { useEffect, useState } from "react";
import api from "../../axios/instance";
import { Badge, Button, Container, Table } from "react-bootstrap";
import AssignComplaintModal from "../components/AssignComplaintModal";
import { useNavigate } from "react-router-dom";

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [assigningStaff, setAssigningStaff] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/all-complaints");
      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComplaints();
    fetchComplaints();
  const interval = setInterval(() => {
    fetchComplaints();
  }, 5000);
  return () => clearInterval(interval);
  }, []);

  const handleAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setAssigningStaff(true);
  };

  const recentComplaints = complaints.filter((complaint) => {
    const recent =
      (new Date() - new Date(complaint.createdAt)) / (1000 * 60 * 60);
    return recent <= 24;
  });
  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "80vh" }}>
      <Container>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2>Recent Complaints (24hrs)</h2>
        <Button onClick={() => navigate("/admin/complaints/all")}>
          View All Complaints
        </Button>
      </div>
      <Table hover responsive bordered>
        <thead className="table-dark">
          <tr>
            <th>Complaint ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recentComplaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.fullName}</td>
              <td>{complaint.phone}</td>
              <td>{complaint.location}</td>
              <td>{complaint.description}</td>
              <td>
                <Badge
                  bg={
                    complaint.status === "Pending"
                      ? "warning"
                      : complaint.status === "Assigned"
                        ? "primary"
                        : complaint.status === "Completed"
                          ? "success"
                          : "danger"
                  }
                >
                  {complaint.status}
                </Badge>
              </td>
              <td>{complaint.assignedStaff?.fullName || "Not Assigned"}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleAssign(complaint)}
                >
                  Assign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AssignComplaintModal
        show={assigningStaff}
        onHide={() => setAssigningStaff(false)}
        onSuccess={fetchComplaints}
        complaint={selectedComplaint}
      />
    </Container>
    </div>
    
  );
};

export default ComplaintManagement;
