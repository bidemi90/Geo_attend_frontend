import React from "react";
import { Link } from "react-router-dom"; // 🧭 Import Link
import { getLocationOnce } from "../utils/geolocation";
import AttendanceChart from "../components/AttendanceChart";
import AttendanceHistory from "../components/AttendanceHistory";
import { FaUser } from "react-icons/fa";
import { FcPlus, FcList, FcTimeline } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import LocationMapPreview from "../components/LocationMapPreview";
const Dashboardhome = () => {
  //   const handleClick = () => {
  //     getLocationOnce(
  //       (coords) => {
  //         console.log("Latitude:", coords.latitude);
  //         console.log("Longitude:", coords.longitude);
  //       },
  //       (error) => {
  //         console.error("Location error:", error);
  //       }
  //     );
  //   };

  return (
    <>
      <section>
        <h2 className="text-capitalize fw-bold mx-3 mt-3 text-light fs-4">
          welcome back
        </h2>

        <div className=" card m-2 p-2">
          <LocationMapPreview />
        </div>

        <div className="d-flex justify-content-around align-items-center dashboardbuttonholder flex-wrap">
          <div className="dashboardbutton col-6 col-md-3 p-3">
            <Link
              to="/dashboard/create-attendance"
              className="text-decoration-none"
            >
              <div className="h-100 d-flex justify-content-center align-items-center col-12 card text-start btn btn-light m-2 p-2 text-capitalize">
                <div className="d-flex flex-column justify-content-evenly align-items-center fw-bold fs-5">
                  <FcPlus className="me-2 fs-2 mb-2" />
                  <p className="text-success text-center text-capitalize">
                    Start New Attendance
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="dashboardbutton col-6 col-md-3 p-3">
            <Link
              to="/dashboard/mark-attendance"
              className="text-decoration-none"
            >
              <div className="h-100 d-flex justify-content-center align-items-center col-12 card text-start btn btn-light m-2 p-2 text-capitalize">
                <div className="d-flex flex-column justify-content-evenly align-items-center fw-bold fs-5">
                  <FcCheckmark className="me-2 fs-2 mb-2" />
                  <p className="text-success text-center text-capitalize">
                    Mark Attendance
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="dashboardbutton col-6 col-md-3 p-3">
            <Link
              to="/dashboard/attendance-taken"
              className="text-decoration-none"
            >
              <div className="h-100 d-flex justify-content-center align-items-center col-12 card text-start btn btn-light m-2 p-2 text-capitalize">
                <div className="d-flex flex-column justify-content-evenly align-items-center fw-bold fs-5">
                  <FcList className="me-2 fs-2 mb-2" />
                  <p className="text-success text-center text-capitalize">
                    Attendance Taken
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="dashboardbutton col-6 col-md-3 p-3">
            <Link
              to="/dashboard/attendance-history"
              className="text-decoration-none"
            >
              <div className="h-100 d-flex justify-content-center align-items-center col-12 card text-start btn btn-light m-2 p-2 text-capitalize">
                <div className="d-flex flex-column justify-content-evenly align-items-center fw-bold fs-5">
                  <FcTimeline className="me-2 fs-2 mb-2" />
                  <p className="text-success text-center text-capitalize">
                    Attendance Timeline
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          <div className="col-12 col-lg-7">
            <div className="card m-3 dashboardtabbox p-2 overflow-x-auto">
              <AttendanceChart />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="card m-3 dashboardtabbox overflow-y-auto p-2 fs-5 fw-bold">
              <AttendanceHistory />
            </div>
          </div>
        </div>

        {/* <button onClick={handleClick} variant="success">
          Get Current Location
        </button> */}
      </section>
    </>
  );
};

export default Dashboardhome;
