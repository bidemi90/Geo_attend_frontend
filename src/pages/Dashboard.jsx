import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleClick = () => {
    getLocationOnce(
      (coords) => {
        console.log("Latitude:", coords.latitude);
        console.log("Longitude:", coords.longitude);
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  };

  return (
    <>
      {/* loading  */}

      <CustomNavbar />

      <section className="outletholder">
        <Outlet />
      
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
