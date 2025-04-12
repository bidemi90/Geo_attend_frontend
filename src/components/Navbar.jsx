// src/components/CustomNavbar.jsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import CurrentTime from "./CurrentTime"; // 🕒 Import time component
import { Link } from "react-router-dom"; // 🧭 Import Link

function CustomNavbar() {
  const expand = "lg";

  return (
    <Navbar expand={expand} className="bg-body-tertiary  px-4">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold text-color text-success">
          GeoAttend
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link
                to="/dashboard"
                className=" text-decoration-none m-3 text-success"
                href="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                to="/dashboard/attendance-history"
                className=" text-decoration-none m-3 text-success"
                href="/history"
              >
                My Timeline
              </Link>
              <Link
                to="/dashboard/attendance-taken"
                className=" text-decoration-none m-3 text-success"
                href="/collected"
              >
                Collected
              </Link>
              <Link
                to="/dashboard/profile"
                className=" text-decoration-none m-3 text-success"
                href="/profile"
              >
                Profile
              </Link>
              <Link
                to=""
                className=" text-decoration-none m-3 text-success"
                href="/collected"
              >
                log out
              </Link>
            </Nav>

            {/* Display current time */}
            <div className=" d-flex justify-content-center align-items-center">
              <CurrentTime />
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
