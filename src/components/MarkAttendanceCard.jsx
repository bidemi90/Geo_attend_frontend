import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

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
    </Container>
  );
};

export default MarkAttendanceCard;
