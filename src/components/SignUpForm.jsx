// src/components/SignUpForm.jsx
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // 🧭 Import Link

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    id: Yup.string().required("Matric No or Lecturer ID is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Container className="d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h4 className="text-center fw-bold mb-4">Create an Account</h4>

        <Formik
          initialValues={{
            name: "",
            id: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            try {
              console.log(values);
              const response = await axios.post(
                "https://geo-attend-server.onrender.com/user/signup",
                {
                  full_name: values.name,
                  matric_number: values.id,
                  email: values.email,
                  password: values.password,
                }
              );
              console.log(response);

              toast.success(response.data.message || "Signup successful!");
              navigate("/login");
              resetForm();
            } catch (error) {
              toast.error(error.message);

              toast.error(error.response.data.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Matric No or Lecturer ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="Enter your ID"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.id && !!errors.id}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  placeholder="Enter your password again"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.confirmpassword && !!errors.confirmpassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmpassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100 rounded-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <div className=" text-center text-capitalize">
              already have an account? 
                <Link
                  to="/login "
                  className=" text-decoration-none m-3 text-success"
                  href="/collected"
                >
                  login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default SignUpForm;
