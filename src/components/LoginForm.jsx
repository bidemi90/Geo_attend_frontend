// src/components/LoginForm.jsx
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const LoginSchema = Yup.object().shape({
  id: Yup.string().required("Matric No or Lecturer ID is required"),
  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);

  return (
    <Container className=" d-flex justify-content-center">
      <Card className="p-4 shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center fw-bold mb-4">Login</h4>

        <Formik
          initialValues={{ id: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true);

            setTimeout(() => {
              toast.success("Login successful!");
              setLoading(false);
              resetForm();
            }, 1500);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Matric No or Lecturer ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="Enter your matric number or ID "
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.id && !!errors.id}
                />
                <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 rounded-3" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" /> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default LoginForm;
