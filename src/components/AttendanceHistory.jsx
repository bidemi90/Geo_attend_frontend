import { ListGroup, Badge } from "react-bootstrap";
import {
  Button,
  Container,
  Form as BootstrapForm,
  Card,
  Spinner,
} from "react-bootstrap";
import { FcApproval } from "react-icons/fc";

const AttendanceHistory = () => {
  const dummyHistory = [
    {
      classSection: "CSC 320 - Software Engineering",
      createdAt: "2025-04-07 10:30 AM",
      markedAt: "2025-04-07 10:45 AM",
    },
    {
      classSection: "CSC 301 - Algorithms",
      createdAt: "2025-04-06 09:00 AM",
      markedAt: "2025-04-06 09:10 AM",
    },
    {
      classSection: "CSC 310 - Networking",
      createdAt: "2025-04-05 08:00 AM",
      markedAt: "2025-04-05 08:03 AM",
    },
    {
      classSection: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      markedAt: "2025-04-04 01:15 PM",
    },
    {
      classSection: "CSC 310 - Networking",
      createdAt: "2025-04-05 08:00 AM",
      markedAt: "2025-04-05 08:03 AM",
    },
    {
      classSection: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      markedAt: "2025-04-04 01:15 PM",
    },
    {
      classSection: "CSC 310 - Networking",
      createdAt: "2025-04-05 08:00 AM",
      markedAt: "2025-04-05 08:03 AM",
    },
    {
      classSection: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      markedAt: "2025-04-04 01:15 PM",
    },
  ];

  return (
    <>
     <div className=" ">
     <h4 className="text-success fw-bold mb-3">Attendance History</h4>
      <ListGroup>
        {dummyHistory.map((entry, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-start"
          >
            <div className=" text-start">
              <p className="fw-bold">{entry.classSection}</p>
              <div className="">
                <p className=" m-0 fw-normal">
                  <span className=" fw-semibold">Created:</span> {entry.createdAt}
                </p>
                <hr />
                <p className=" m-0 fw-normal">
                  <span className=" fw-semibold">Marked:</span> {entry.markedAt}
                </p>
              </div>
            </div>
            <Badge bg="success" pill>
            <FcApproval className=" fs-4" />
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
     </div>
    </>
  );
};

export default AttendanceHistory;
