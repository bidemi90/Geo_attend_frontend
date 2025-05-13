import React, { useState } from "react";
import { Table, Button, Badge, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CollectedAttendance = () => {
  const { userAttendance, isLoading, error } = useSelector(
    (state) => state.userAttendance
  );
console.log(userAttendance);

  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const handleViewAttendance = (attendance) => {
    setSelectedAttendance(attendance);
    setShowModal(true);
  };

  const handleDownloadPDF = () => {
    if (!selectedAttendance) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Attendance Report", 14, 15);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    const infoLines = [
      `Class/Section: ${selectedAttendance.classSection}`,
      `Created By: ${selectedAttendance.creatorName}`,
      `Created At: ${new Date(selectedAttendance.createdAt).toLocaleString()}`,
      `Duration: ${selectedAttendance.duration}`,
      `Location: ${selectedAttendance.location_name}, Lat ${selectedAttendance.location_lat}, Lng ${selectedAttendance.location_lng}`,
    ];

    infoLines.forEach((line, i) => {
      doc.text(line, 14, 30 + i * 7);
    });

    const tableData = selectedAttendance.attendees.map((attendee, index) => [
      index + 1,
      attendee.fullName,
      attendee.matricNumber,
      attendee.email || "-",
      new Date(attendee.timestamp).toLocaleString(),
      attendee.location_name || "N/A", // Add location name here
    ]);

    autoTable(doc, {
      startY: 30 + infoLines.length * 7 + 5,
      head: [["#", "Full Name", "Matric Number", "Email", "Timestamp", "Location"]], // Add "Location" column
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [40, 167, 69], // Bootstrap success green
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        font: "helvetica",
        fontSize: 11,
      },
    });

    doc.save(`Attendance_${selectedAttendance.classSection}.pdf`);
  };

  const nowrap = { whiteSpace: "nowrap" };
  const wrapStyle = { whiteSpace: "normal", maxWidth: "250px" };

  return (
    <>
      <div className="col-10 m-auto card p-3 mt-4 overflow-y-auto">
        <h4 className="text-success fw-bold mb-3">Collected Attendance</h4>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">Error: {error}</p>
        ) : userAttendance.length === 0 ? (
          <p className="text-center text-muted fw-bold">
            You have not taken any attendance yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover>
              <thead className="table-success">
                <tr>
                  <th style={nowrap}>S/N</th>
                  <th style={wrapStyle}>Section</th>
                  <th style={nowrap}>Code</th>
                  <th style={nowrap}>Created At</th>
                  <th style={nowrap}>Duration</th>
                  <th style={nowrap}>Total</th>
                  <th style={nowrap}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userAttendance.map((session, index) => (
                  <tr key={index}>
                    <td style={nowrap}>{index + 1}</td>
                    <td style={wrapStyle} className="fw-semibold">
                      {session.classSection}
                    </td>
                    <td style={nowrap}>{session.code}</td>
                    <td style={nowrap}>
                      {new Date(session.createdAt).toLocaleString()}
                    </td>
                    <td style={nowrap}>
                      <Badge bg="secondary">{session.duration}</Badge>
                    </td>
                    <td style={nowrap}>
                      <Badge bg="success">{session.attendees.length}</Badge>
                    </td>
                    <td style={nowrap}>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-success"
                          onClick={() => handleViewAttendance(session)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => {
                            setSelectedAttendance(session);
                            handleDownloadPDF();
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Attendance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-success text-light">
          {selectedAttendance ? (
            <>
              <p>
                <strong>Class/Section:</strong>{" "}
                {selectedAttendance.classSection}
              </p>
              <p>
                <strong>Created By:</strong> {selectedAttendance.creatorName}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedAttendance.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {selectedAttendance.duration}
              </p>
              <p>
                <strong>Location:</strong> {selectedAttendance.location_name}, Lat{" "}
                {selectedAttendance.location_lat}, Lng{" "}
                {selectedAttendance.location_lng}
              </p>

              <hr />
              <h5>Attendees</h5>
              <Table striped bordered hover responsive variant="light">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Matric Number</th>
                    <th>Email</th>
                    <th>Timestamp</th>
                    <th>Location</th> {/* Add location name column */}
                  </tr>
                </thead>
                <tbody>
                  {selectedAttendance.attendees.map((att, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{att.fullName}</td>
                      <td>{att.matricNumber}</td>
                      <td>{att.email || "-"}</td>
                      <td>{new Date(att.timestamp).toLocaleString()}</td>
                      <td>{att.location_name || "N/A"}</td> {/* Display Location Name */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>No attendance selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CollectedAttendance;
