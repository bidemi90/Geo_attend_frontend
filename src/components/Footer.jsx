// src/components/Footer.jsx
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light text-success py-4  animate__animated animate__fadeInUp">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="fw-bold">About GeoAttend</h5>
            <p style={{ fontSize: "0.9rem" }}>
              GeoAttend is a geolocation-based attendance system designed for
              CSC 320 project. It ensures students are present in class
              physically before marking attendance.
            </p>
          </Col>

          <Col md={6}>
            <h6 className="fw-bold">Project Team</h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: "0.9rem" }}>
              <li className=" fw-semibold">
                SUPERVISOR: DR. STEPHEN ALABA MOGAJI
              </li>
              <li>SODIQ ABDULAHI BIDEMI – CSC/2022/2006</li>
              <li>OGUNMOYOLE OLUWASEUN EZEKIEL – CSC/2021/1073</li>
              <li>AYOKUNLE ILEMOBAYO AYOMIDE – CSC/2022/1039</li>
            </ul>
            <p className="mt-2 text-muted" style={{ fontSize: "0.85rem" }}>
              © {new Date().getFullYear()} CSC 320 – Department of Computer
              Science
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
