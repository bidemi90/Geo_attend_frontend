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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  featchinguser,
  featchinguserfailed,
  featchinguserSuccessful,
  fetchUpdatedUserData,
} from "../components/Redux/userdata";
import { getLocationOnce } from "../utils/geolocation";
import { getLocationOnceWithName } from "../utils/geolocation";

import { Clipboard } from "react-bootstrap-icons";

const CreateAttendanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const creatorName = userdata.user.full_name;
  const creatorID = userdata.user._id;
  const creationTime = new Date().toLocaleString();

  const [location, setLocation] = useState({ lat: null, lng: null, name: "" });
  const [loading, setLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [attendanceLink, setAttendanceLink] = useState("");

  const validationSchema = Yup.object().shape({
    classSection: Yup.string().required("Class/Section is required"),
    duration: Yup.number()
      .min(1, "Minimum duration is 1 minute")
      .required("Duration is required"),
  });

  // Auto-fetch location on mount
  useEffect(() => {
    getLocationOnceWithName(
      (coords) => {
        setLocation(coords);
        setLocationFetched(true);
        toast.success("Location fetched successfully!");
      },
      (error) => {
        toast.error("Location error: " + error.message);
      }
    );
  }, []);
  

  const handleCopy = () => {
    if (attendanceLink) {
      navigator.clipboard.writeText(attendanceLink);
      toast.success("Link copied!");
    }
  };

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
        creatorID,
        creationTime,
        location_lat: location.lat,
        location_lng: location.lng,
        location_name: location.name, // ✅ Added location name
      };
      
      console.log(payload);

      const res = await axios.post(
        "https://geo-attend-server.onrender.com/user/createAttendance",
        payload
      );

      console.log(res);

      toast.success("Attendance Created Successfully!");

      const generatedCode = res.data?.data?.code;
      const link = `https://geo-attend-frontend.vercel.app/#/dashboard/mark-attendance?code=${generatedCode}`;

      setAttendanceLink(link); // <-- show the card with the link
      resetForm();
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Failed to create attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                    placeholder="Input Class Name Or Attendance Name"
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
                    placeholder="Input Attendance Duration"
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
                    getLocationOnceWithName(
                      (coords) => {
                        setLocation(coords);
                        setLocationFetched(true);
                        toast.success("Location fetched!");
                      },
                      (error) => toast.error("Location error: " + error.message)
                    );
                  }}
                  
                  className="w-100 mb-3"
                >
                  {locationFetched
                    ? "Location Fetched ✅"
                    : "Fetch Location 📍"}
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
      {attendanceLink && (
        <div className="mt-5 d-flex justify-content-center col-11 mx-auto pb-5">
          <Card
            className="p-4 mx-auto mt-4 col- shadow rounded-4"
            style={{ maxWidth: "450px", width: "100%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="text-success mb-0">Attendance Link</h5>
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                <Clipboard className="me-1" size={16} />
                Copy
              </Button>
            </div>
            <p className="mb-1 text-break">{attendanceLink}</p>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateAttendanceForm;
