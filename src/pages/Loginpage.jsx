import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom"; // 🧭 Import Link
import Footer from "../components/Footer";
import LandingNav from "../components/LandingNav";

const Loginpage = () => {
  return (
    <>
      <LandingNav />
      <section className=" loginandsigninformholder h-100 d-flex justify-content-center align-items-center  ">
        <div>
          <h2 className=" text-light fw-bold text-capitalize text-center mb-2 mt-4 pb-4">
            login to your account
          </h2>
          <LoginForm />
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Loginpage;
