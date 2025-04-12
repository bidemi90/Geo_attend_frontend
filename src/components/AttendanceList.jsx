import { Table, Container, Card, Badge } from "react-bootstrap";

const AttendanceList = () => {
  const attendanceData = [
    {
      name: "Abdullahi Musa",
      matric: "CSC/2019/123",
      time: "08:05 AM",
    },
    {
      name: "Fatima Lawal",
      matric: "CSC/2019/125",
      time: "08:12 AM",
    },
    {
      name: "Ahmed Bello",
      matric: "CSC/2019/130",
      time: "08:20 AM",
    },
    {
      name: "Grace Okonkwo",
      matric: "CSC/2019/145",
      time: "08:30 AM",
    },
  ];

  const nowrap = { whiteSpace: "nowrap" };
  const wrap = {
    whiteSpace: "normal",
    maxWidth: "250px",
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow rounded-4" style={{ width: "100%" }}>
        <h4 className="text-success fw-bold mb-3">Attendance List</h4>

        <div style={{ overflowX: "auto", width: "100%" }}>
          <Table bordered hover>
            <thead className="table-success">
              <tr>
                <th style={nowrap}>S/N</th>
                <th style={wrap}>Name</th>
                <th style={nowrap}>Matric No / ID</th>
                <th style={nowrap}>Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student, index) => (
                <tr key={index}>
                  <td style={nowrap}>{index + 1}</td>
                  <td style={wrap}>{student.name}</td>
                  <td style={nowrap}>{student.matric}</td>
                  <td style={nowrap}>
                    <Badge bg="secondary">{student.time}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default AttendanceList;
