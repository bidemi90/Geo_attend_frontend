import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";



import {
  featchinguser,
  featchinguserfailed,
  featchinguserSuccessful,
  fetchUpdatedUserData,
} from "../components/Redux/userdata";
import {
  fetchUserAttendance,
} from "../components/Redux/userAttendanceSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
      (state) => state.userdata
    );
    const { userAttendance, isLoading, error } = useSelector(
      (state) => state.userAttendance
    );

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


  useEffect(() => {
    axios
      .get("http://localhost:1100/user/verifyuserondashbord", {
        headers: {
          Authorization: `Bearer ${userdata.token}`,
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err) {
          navigate("/login");
        }
      });
    

    
      dispatch(fetchUserAttendance(userdata.user._id));
  }, []);



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
