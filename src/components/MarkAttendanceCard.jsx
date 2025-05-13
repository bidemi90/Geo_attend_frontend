import { useState } from "react";
import { Container, Card, Button, Spinner, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { verifyUserLocation } from "../utils/geolocation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { getLocationOnceWithName } from "../utils/geolocation";

const MarkAttendanceCard = ({ codeFromURL }) => {
  const navigate = useNavigate();

  const { userdata } = useSelector((state) => state.userdata);
  const [loading, setLoading] = useState(false);
  const [locationValid, setLocationValid] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null, name: "" });

  const [userLocation, setUserLocation] = useState(null);
  const [code, setCode] = useState("");
  const [attendanceInfo, setAttendanceInfo] = useState(null);
  const [submittingCode, setSubmittingCode] = useState(false);

  useEffect(() => {
    if (codeFromURL) {
      setCode(codeFromURL);
    }
  }, [codeFromURL]);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter an attendance code.");
      return;
    }

    setSubmittingCode(true);
    console.log(code);

    try {
      const response = await axios.get(
        `https://geo-attend-server.onrender.com/user/getAttendanceByCode/${code}`
      );
      if (response.data.success) {
        setAttendanceInfo(response.data.data);
        toast.success("Attendance info loaded.");
      } else {
        toast.error(response.data.message || "Invalid code.");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error("Failed to fetch attendance info.");
      toast.error(error.response.data.message);
    } finally {
      setSubmittingCode(false);
    }
  };

  const handleVerifyLocation = () => {
    if (!attendanceInfo) return;

    const { location_lat, location_lng } = attendanceInfo;
    const allowedDistance = attendanceInfo.classRange;

    verifyUserLocation(
      location_lat,
      location_lng,
      allowedDistance,
      (isNearby) => {
        if (isNearby) {
          setLocationValid(true);
          toast.success("You are within the allowed location ✅");
        } else {
          setLocationValid(false);
          toast.error("You are too far from the required location ❌");
        }
      },
      setUserLocation
    );
  };

  const handleSubmitAttendance = async () => {
    if (!userdata?.user || !attendanceInfo || !userLocation) {
      toast.error("Missing required data to mark attendance.");
      return;
    }

    setLoading(true);
    const user = userdata.user;
    const timestamp = new Date().toISOString();

    const attendanceData = {
      fullName: user.full_name,
      matric_number: user.matric_number,
      email: user.email,
      timestamp,
      code,
      location_name: userLocation.location_name,
    };
    console.log(attendanceData);

    try {
      await axios.post(
        "https://geo-attend-server.onrender.com/user/markattendance",
        attendanceData
      );
      toast.success("Attendance marked successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Failed to mark attendance.");
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitAttendanceonline = async () => {
    if (!userdata?.user || !attendanceInfo || !location) {
      toast.error("Missing required data to mark attendance.");
      return;
    }

    setLoading(true);
    const user = userdata.user;
    const timestamp = new Date().toISOString();

    const attendanceData = {
      fullName: user.full_name,
      matric_number: user.matric_number,
      email: user.email,
      timestamp,
      code,
      location_name: location.name,
    };
    console.log(attendanceData);

    try {
      await axios.post(
        "https://geo-attend-server.onrender.com/user/markattendance",
        attendanceData
      );
      toast.success("Attendance marked successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Failed to mark attendance.");
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h4 className="text-success fw-bold mb-3">Mark Attendance</h4>

        {/* Step 1: Code Input */}
        {!attendanceInfo && (
          <Form onSubmit={handleCodeSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Attendance Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={submittingCode}
            >
              {submittingCode ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit Code"
              )}
            </Button>
          </Form>
        )}

        {/* Step 2: Show Attendance Info + Actions */}
        {attendanceInfo && (
          <>
            <div className="mb-2 text-capitalize">
              <strong>Class/Section:</strong> {attendanceInfo.classSection}
            </div>
            <div className="mb-2 text-capitalize">
              <strong>Created By:</strong> {attendanceInfo.creatorName}
            </div>
            <div className="mb-2 text-capitalize">
              <strong>Created At:</strong> {attendanceInfo.createdAt}
            </div>
            <div className="mb-2 text-capitalize">
              <strong>Duration:</strong> {attendanceInfo.duration}
            </div>
            <div className="mb-2 text-capitalize fw-bold">
              <strong>attendance type:</strong> {attendanceInfo.attendanceType}
            </div>
            <div
              className={
                attendanceInfo.attendanceType == "In-person"
                  ? "d-block mb-3 text-capitalize p-2"
                  : "d-none"
              }
            >
              <strong>Location Required:</strong>
              <div>
                <strong>location name:</strong> {attendanceInfo.location_name}{" "}
                <br />
                <strong>latitude:</strong> {attendanceInfo.location_lat} <br />
                <strong>longitude:</strong> {attendanceInfo.location_lng}
              </div>
            </div>

            <div
              className={
                attendanceInfo.attendanceType == "In-person"
                  ? "d-block "
                  : "d-none"
              }
            >
              <Button
                variant="success"
                onClick={handleVerifyLocation}
                className="mb-3 w-100"
              >
                Verify Location
              </Button>

              <Button
                variant="success"
                onClick={handleSubmitAttendance}
                disabled={loading || !locationValid}
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Marking...
                  </>
                ) : (
                  "Mark Attendance"
                )}
              </Button>
            </div>
            <div
              className={
                attendanceInfo.attendanceType == "In-person"
                  ? "d-none "
                  : "d-block"
              }
            >
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
                {locationFetched ? "Location Fetched ✅" : "Fetch Location 📍"}
              </Button>

              <Button
                variant="success"
                onClick={handleSubmitAttendanceonline}
                disabled={loading || !locationFetched}
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Marking...
                  </>
                ) : (
                  "Mark Attendance"
                )}
              </Button>
            </div>
          </>
        )}
      </Card>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default MarkAttendanceCard;
