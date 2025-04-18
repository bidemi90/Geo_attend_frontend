import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getLocationOnce,
  verifyUserLocation,
  startWatchingLocation,
  stopWatchingLocation,
} from "../utils/geolocation";

const MarkAttendanceCard = () => {
  const [loading, setLoading] = useState(false);

  // Sample dummy values (these will come from the attendance link in real use)
  const attendanceInfo = {
    classSection: "CSC 320 - Software LAB",
    creatorName: "Sodiq Abdullahi Bidemi",
    createdTime: "2025-04-07 10:30 AM",
    location: "Lecture Hall A", // Replace with actual fetched location
    duration: "45 minutes",
  };

  const handleMark = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Attendance marked successfully!");
      setLoading(false);
    }, 2000);
  };
  
  const targetLat =  7.8004064;
  const targetLng = 5.3254184;

  const handleStartWatch = () => {
    startWatchingLocation(targetLat, targetLng);
  };

  const handleStopWatch = () => {
    stopWatchingLocation();
  };

  const handleVerify = () => {
    // const targetLat = 9.0562646; // Replace with actual classroom lat
    // const targetLng = 7.4985259; // Replace with actual classroom lng
    const allowedDistance = 600; // meters (~650 yards)

    verifyUserLocation(targetLat, targetLng, allowedDistance, (isNearby) => {
      if (isNearby) {
        console.log("Allow attendance");
      } else {
        console.log("Block attendance");
      }
    });
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h4 className="text-success fw-bold mb-3">Mark Attendance</h4>

        <div className="mb-2">
          <strong>Class/Section:</strong> {attendanceInfo.classSection}
        </div>
        <div className="mb-2">
          <strong>Created By:</strong> {attendanceInfo.creatorName}
        </div>
        <div className="mb-2">
          <strong>Created At:</strong> {attendanceInfo.createdTime}
        </div>
        <div className="mb-2">
          <strong>Duration:</strong> {attendanceInfo.duration}
        </div>
        <div className="mb-3">
          <strong>Location Required:</strong> {attendanceInfo.location}
        </div>
        <button onClick={handleVerify}>handleVerify</button>
        <button onClick={handleStartWatch}>Start Watching Location</button>
        <button onClick={handleStopWatch}>Stop Watching Location</button>

        <Button
          variant="success"
          onClick={handleMark}
          disabled={loading}
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
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default MarkAttendanceCard;
