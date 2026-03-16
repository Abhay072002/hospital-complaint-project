import { Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import api from "../../axios/instance";
import { toast } from "react-toastify";

const CreateStaffModal = ({show,onHide,onSuccess}) => {
   const { Formik } = formik;

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    employeeId: yup.string().required(),
    password: yup.string().required(),
    department: yup.string().required(),
    shift: yup.string().required(),
  });
    
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add New Staff
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
      validationSchema={schema}
      onSubmit={ async (values, {resetForm}) =>{
        try {
          await api.post("/admin/create-staff" , values);
          toast.success("Staff Created Successfully");
          resetForm();
          onSuccess();
          onHide();
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong")   
        }
      }
        
      }
      initialValues={{
        fullName: '',
        employeeId: '',
        password: '',
        department: '',
        shift: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isValid={touched.fullName && !errors.fullName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>employeeId</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={values.employeeId}
                onChange={handleChange}
                isValid={touched.employeeId && !errors.employeeId}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>department</Form.Label>
              <Form.Control
                type="text"
                placeholder="department"
                name="department"
                value={values.department}
                onChange={handleChange}
                isInvalid={!!errors.department}
              />

              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>shift</Form.Label>
              <Form.Select
                name="shift"
                value={values.shift}
                onChange={handleChange}
              >
                <option value="" > select Shift</option>
                <option value="Morning" >Morning</option>
                <option value="Evening" >Evening</option>
                <option value="Night" >Night</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.shift}
              </Form.Control.Feedback>
            </Form.Group>
            </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default CreateStaffModal