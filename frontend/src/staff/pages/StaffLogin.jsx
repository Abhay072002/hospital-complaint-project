import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../axios/instance";
import { toast } from "react-toastify";

const StaffLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { Formik } = formik;

  const schema = yup.object().shape({
    employeeId: yup
      .string()
      .min(6, "employee id mush have 6 characters")
      .required("please enter correct employeeId"),
    password: yup
      .string()
      .min(4, "password must have 6 characters")
      .required("please enter password"),
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "rgb(240, 244, 248)" }}
    >
      <div
        className="bg-white p-5 rounded-4 shadow"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold">Staff Login</h3>
          <p className="text-muted">Sign in with your staff credentials</p>
        </div>

        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              const res = await api.post("/auth/login", {
                employeeId: values.employeeId,
                password: values.password,
              });

              localStorage.setItem(
                `user-${res.data.user.role}`,
                JSON.stringify(res.data.user),
              );
              setUser(res.data.user);
              toast.success("Logged in Successfully");
              navigate("/staff");
            } catch (error) {
              toast.error(error.response?.data?.message || "Login failed");
            }
          }}
          initialValues={{
            employeeId: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationFormik01">
                  <Form.Label>EMPLOYEE ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="employeeId"
                    placeholder="Enter your employee ID"
                    value={values.employeeId}
                    onChange={handleChange}
                    isValid={touched.employeeId && !errors.employeeId}
                    isInvalid={touched.employeeId && !!errors.employeeId}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.employeeId}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik02">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button className=" w-100" type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StaffLogin;
