import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Container } from "react-bootstrap";
import { HiOutlineClipboardList } from "react-icons/hi";
import { PiRocketLaunchThin } from "react-icons/pi";
import { HiArrowLongLeft } from "react-icons/hi2";
import api from "../axios/instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .required("Full Name is required"),
    phoneNumber: yup
      .string()
      .min(10, "Phone must be 10 digits")
      .required("Phone Number is required"),
    location: yup.string().required("Location is required"),
    complaintDescription: yup
      .string()
      .min(5, "Description must be at least 10 characters")
      .required("Complaint Description is required"),
  });
  return (
    <>
      <div>
        <Container
          className="d-flex justify-content-center align-items-center my-5"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="bg-white shadow rounded-4 p-4"
            style={{ width: "100%", maxWidth: "550px" }}
          >
            <div className=" d-flex justify-content-center mb-3">
              <HiOutlineClipboardList color="blue" size={50} />
            </div>

            <div className=" d-flex flex-column align-items-center">
              <h5 className=" fw-bold fs-5"> Submit a Complaint</h5>
              <p className=" text-muted">
                Fill in the details below and we'll get back to you soon.
              </p>
            </div>

            <Row className=" mt-4">
              <Col>
                <Formik
                  validationSchema={schema}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const res = await api.post("/complaints", {
                        fullName: values.fullName,
                        phone: values.phoneNumber,
                        location: values.location,
                        description: values.complaintDescription,
                      });
                      toast.success(res.data.message);
                      localStorage.setItem("complaintId",res.data.complaintId);
                      resetForm();
                      navigate("/")
                    } catch (error) {
                        toast.error( error.response?.data?.message || "Something went wrong");
                    }
                  }}
                  initialValues={{
                    fullName: "",
                    phoneNumber: "",
                    location: "",
                    complaintDescription: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md={12}
                          controlId="validationFormik01"
                        >
                          <Form.Label>Full name</Form.Label>
                          <Form.Control
                            className="form-control form-control-lg"
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={values.fullName}
                            onChange={handleChange}
                            isValid={touched.fullName && !errors.fullName}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md={12}
                          controlId="validationFormik02"
                        >
                          <Form.Label>phone Number</Form.Label>
                          <Form.Control
                            className="form-control form-control-lg"
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your Phone number"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            isValid={touched.phoneNumber && !errors.phoneNumber}
                          />

                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md={12}
                          controlId="validationFormikUsername"
                        >
                          <Form.Label>location</Form.Label>

                          <Form.Control
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Enter your Floor & Room number"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                            isInvalid={!!errors.location}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.location}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md={12}
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Complaint Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="form-control form-control-lg"
                            placeholder="Describe your complaint in detail"
                            name="complaintDescription"
                            value={values.complaintDescription}
                            onChange={handleChange}
                            isInvalid={!!errors.complaintDescription}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.complaintDescription}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Button className=" w-100 btn-lg mb-3" type="submit" >
                        <span className=" me-1">
                          <PiRocketLaunchThin size={20} />
                        </span>
                        Submit Complaint
                      </Button>
                      <div className=" d-flex justify-content-center mb-4">
                        <a
                          className=" text-decoration-none text-black text-muted"
                          href="/"
                        >
                          <span>
                            <HiArrowLongLeft />
                          </span>{" "}
                          Back to Home
                        </a>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ComplaintForm;
