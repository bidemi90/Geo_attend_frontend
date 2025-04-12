import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Form as BootstrapForm,
  Card,
  Spinner,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { getLocationOnce } from "../utils/geolocation";

const CreateAttendanceForm = () => {
  const creatorName = "Sodiq Abdullahi Bidemi";
  const creationTime = new Date().toLocaleString();

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  const validationSchema = Yup.object().shape({
    classSection: Yup.string().required("Class/Section is required"),
    duration: Yup.number()
      .min(1, "Minimum duration is 1 minute")
      .required("Duration is required"),
  });

  // Auto-fetch location on mount
  useEffect(() => {
    getLocationOnce(
      (coords) => {
        setLocation({ lat: coords.latitude, lng: coords.longitude });
        setLocationFetched(true);
        toast.success("Location fetched successfully!");
      },
      (error) => {
        toast.error("Location error: " + error.message);
      }
    );
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (!locationFetched) {
      toast.error("Please fetch your location before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        classSection: values.classSection,
        duration: values.duration,
        creatorName,
        creationTime,
        location_lat: location.lat,
        location_lng: location.lng,
      };
      console.log(payload);

      const res = await axios.post("/api/attendance", payload);
      toast.success("Attendance Created Successfully!");
      resetForm();
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Failed to create attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h3 className="text-success mb-4">Create Attendance</h3>

        <Formik
          initialValues={{
            classSection: "",
            duration: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Class/Section</BootstrapForm.Label>
                <BootstrapForm.Control
                  name="classSection"
                  type="text"
                  value={values.classSection}
                  onChange={handleChange}
                  isInvalid={touched.classSection && !!errors.classSection}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.classSection}
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Duration (minutes)</BootstrapForm.Label>
                <BootstrapForm.Control
                  name="duration"
                  type="number"
                  value={values.duration}
                  onChange={handleChange}
                  isInvalid={touched.duration && !!errors.duration}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.duration}
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Creator's Name</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  value={creatorName}
                  readOnly
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Time Created</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  value={creationTime}
                  readOnly
                />
              </BootstrapForm.Group>

              <Button
                variant="outline-success"
                onClick={() => {
                  getLocationOnce(
                    (coords) => {
                      setLocation({
                        lat: coords.latitude,
                        lng: coords.longitude,
                      });
                      setLocationFetched(true);
                      toast.success("Location fetched!");
                    },
                    (error) => toast.error("Location error: " + error.message)
                  );
                }}
                className="w-100 mb-3"
              >
                {locationFetched ? "Location Fetched ✅" : "Fetch Location 📍"}
              </Button>

              <Button
                variant="success"
                type="submit"
                disabled={loading || !locationFetched}
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Creating...
                  </>
                ) : (
                  "Create Attendance"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </Card>
    </Container>
  );
};

export default CreateAttendanceForm;
