import React, { useEffect, useState } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Form, Button, Modal } from "react-bootstrap";
import api from "../../axios/instance";
import { toast } from "react-toastify";

const AssignComplaintModal = ( { show, onHide, onSuccess, complaint }) => {
  const { Formik } = formik;
  const [staffList, setStaffList] = useState([]);

  const fetchStaff = async () => {
     const res = await api.get("/admin/staff");
    setStaffList(res.data.staff);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const schema = yup.object().shape({
    assignedTo: yup.string().required("Please select a staff member"),
  });
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Complaint Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          initialValues={{ assignedTo: "" }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await api.patch(`/admin/assign-complaint/${complaint.complaintId}`, {
                 assignedTo: values.assignedTo ,
              });
              toast.success("Complaint reassigned successfully!");
              resetForm();
              onSuccess();
              onHide();
            } catch (error) {
              toast.error(error.response?.data?.message || "Something went wrong")
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Label>Select Staff</Form.Label>
              <Form.Select
                name="assignedTo"
                value={values.assignedTo}
                onChange={handleChange}
                isInvalid={!!errors.assignedTo}
              >
                <option value="">-- Select Staff --</option>
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.fullName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.assignedTo}
              </Form.Control.Feedback>
              <Button type="submit" className="mt-3 w-100">
                Assign
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AssignComplaintModal;
