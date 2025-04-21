import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom"; // 🧭 Import Link
import Footer from "../components/Footer";
import LandingNav from "../components/LandingNav";

const Signuppage = () => {
  return (
    <>
      <LandingNav />
      <section className=" loginandsigninformholder h-100 d-flex justify-content-center align-items-center  ">
        <div className=" mb-4">
          <h2 className=" text-light fw-bold text-capitalize mb-2 mt-4 pb-4 text-center">
            fill form to create a new account
          </h2>

          <SignUpForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signuppage;
