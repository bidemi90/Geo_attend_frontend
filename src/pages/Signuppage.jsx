import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom"; // 🧭 Import Link

const Signuppage = () => {
  return (
    <>
      <section className=" loginandsigninformholder h-100 d-flex justify-content-center align-items-center  ">
        <div>
          <h2 className=" text-light fw-bold text-capitalize mb-4 pb-4">
            fill form to create a new account
          </h2>
          <Link to="/login" className="text-decoration-none">
            login
          </Link>
          <Link to="/dashboard" className="text-decoration-none">
            dashboard
          </Link>
          <Link to="/dashboard/LocationTracker" className="text-decoration-none">
          LocationTracker
          </Link>
          <SignUpForm />
        </div>
      </section>
    </>
  );
};

export default Signuppage;
