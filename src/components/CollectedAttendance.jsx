import { Table, Container, Card, Button, Badge } from "react-bootstrap";

const CollectedAttendance = () => {
  const attendanceSessions = [
    {
      section: "CSC 305 - Web Development",
      createdAt: "2025-04-07 08:00 AM",
      duration: "1 hour",
      markedCount: 42,
    },
    {
      section: "CSC 310 - Data Structures",
      createdAt: "2025-04-06 09:00 AM",
      duration: "1 hour",
      markedCount: 38,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
    {
      section: "CSC 320 - Software Engineering",
      createdAt: "2025-04-05 11:00 AM",
      duration: "1 hour",
      markedCount: 45,
    },
    {
      section: "CSC 330 - AI Concepts",
      createdAt: "2025-04-04 01:00 PM",
      duration: "1 hour",
      markedCount: 40,
    },
  ];

  const nowrap = {
    whiteSpace: "nowrap",
  };

  const wrapStyle = {
    whiteSpace: "normal",
    maxWidth: "250px",
  };

  return (
    <div className="col-10 m-auto card p-3 mt-4 h-100 overflow-y-auto">
      <h4 className="text-success fw-bold mb-3">Collected Attendance</h4>

      <div style={{ overflowX: "auto", overflowY: "auto", width: "100%" }}>
        <Table bordered hover>
          <thead className="table-success">
            <tr>
              <th style={nowrap}>S/N</th>
              <th style={wrapStyle}>Section</th>
              <th style={nowrap}>Created At</th>
              <th style={nowrap}>Duration</th>
              <th style={nowrap}>Total Number</th>
              <th style={nowrap}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceSessions.map((session, index) => (
              <tr key={index}>
                <td style={nowrap}>{index + 1}</td>
                <td style={wrapStyle} className="fw-semibold">
                  {session.section}
                </td>
                <td style={nowrap}>{session.createdAt}</td>
                <td style={nowrap}>
                  <Badge bg="secondary">{session.duration}</Badge>
                </td>
                <td style={nowrap}>
                  <Badge bg="success">{session.markedCount}</Badge>
                </td>
                <td style={nowrap}>
                  <div className="d-flex gap-2">
                    <Button variant="outline-success" size="sm">
                      View
                    </Button>
                    <Button variant="outline-dark" size="sm">
                      Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CollectedAttendance;
