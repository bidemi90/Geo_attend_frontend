import jsPDF from "jspdf";
import "jspdf-autotable";
import { Modal, Table } from "react-bootstrap";

// Inside your component:
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
  doc.text("Attendance Report", 14, 15);
  doc.setFontSize(12);

  // Attendance Info
  const infoLines = [
    `Class/Section: ${selectedAttendance.classSection}`,
    `Created By: ${selectedAttendance.creatorName}`,
    `Created At: ${new Date(selectedAttendance.createdAt).toLocaleString()}`,
    `Duration: ${selectedAttendance.duration}`,
    `Location: Lat ${selectedAttendance.location_lat}, Lng ${selectedAttendance.location_lng}`,
  ];
  infoLines.forEach((line, i) => doc.text(line, 14, 30 + i * 7));

  // Attendees Table
  const tableData = selectedAttendance.attendees.map((attendee, index) => [
    index + 1,
    attendee.fullName,
    attendee.matricNumber,
    attendee.email || "-",
    new Date(attendee.timestamp).toLocaleString(),
  ]);

  doc.autoTable({
    startY: 30 + infoLines.length * 7 + 5,
    head: [["#", "Full Name", "Matric Number", "Email", "Timestamp"]],
    body: tableData,
  });

  doc.save(`Attendance_${selectedAttendance.classSection}.pdf`);
};
