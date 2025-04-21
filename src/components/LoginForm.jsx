// src/components/LoginForm.jsx
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  featchinguser,
  featchinguserfailed,
  featchinguserSuccessful,
  fetchUpdatedUserData,
} from "./Redux/userdata";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const LoginSchema = Yup.object().shape({
    id: Yup.string().required("Matric No or Lecturer ID is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Container className="d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h4 className="text-center fw-bold mb-4">Welcome Back</h4>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              dispatch(featchinguser());

              const response = await axios.post(
                "http://localhost:1100/user/login",
                {
                  matric_number: values.id,
                  password: values.password,
                }
              );
              console.log(response);

              toast.success(response.data.message || "Login successful!");
              setTimeout(() => {
                dispatch(featchinguserSuccessful(response.data));

                navigate("/dashboard");
              }, 2000);
            } catch (error) {
              toast.error(error.response?.data?.message || "Login failed!");

              dispatch(featchinguserfailed(err.response.data.message));
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
                <Form.Label className=" text-capitalize">
                  matric number / ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="AAA/2000/0001"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.id && !!errors.id}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.password}
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
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>

              <div className="text-center text-capitalize mt-3">
                don't have an account?
                <Link
                  to="/"
                  className="text-decoration-none m-2 text-success"
                >
                  Sign up
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

export default LoginForm;
