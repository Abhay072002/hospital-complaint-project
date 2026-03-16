import { useState } from "react";
import { Container, Card, Badge, Button, Form } from "react-bootstrap";
import api from "../axios/instance";
import { toast } from "react-toastify";

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!complaintId) {
      toast.error("Please enter a complaint ID");
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/complaints/track/${complaintId}`);
      setComplaints(res.data.complaints);
    } catch (error) {
      toast.error("Complaint not found. Please check your ID!");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Container className="py-5 d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h4 className="fw-bold text-center mb-2">Track Your Complaint</h4>
          <p className="text-muted text-center mb-4">
            Enter your complaint ID to check status
          </p>

          <div className="d-flex gap-2 mb-4">
            <Form.Control
              placeholder="Enter Complaint ID or Phone number"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
            />
            <Button onClick={handleTrack}>Track</Button>
          </div>

         {complaints.map((complaint) => (
  <Card key={complaint.complaintId} className="border-0 shadow-sm rounded-4 p-4 mb-3">
    <h6 className="text-muted mb-3">Complaint Details</h6>
    <p className="mb-1"><span className="fw-bold">Complaint ID:</span> {complaint.complaintId}</p>
    <p className="mb-1"><span className="fw-bold">Description:</span> {complaint.description}</p>
    <p className="mb-1"><span className="fw-bold">Assigned Staff:</span> {complaint.assignedStaff?.fullName || "Not Assigned Yet"}</p>
    <div className="mt-2">
      <span className="fw-bold me-2">Status:</span>
      <Badge bg={
        complaint.status === "Pending" ? "warning" :
        complaint.status === "Assigned" ? "primary" :
        complaint.status === "Completed" ? "success" : "danger"
      }>
        {complaint.status}
      </Badge>
    </div>
  </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrackComplaint;
