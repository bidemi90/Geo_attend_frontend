import React from "react";
import LoginForm from "../components/LoginForm";

const Loginpage = () => {
  return (
    <>
      <section className=" loginandsigninformholder h-100 d-flex justify-content-center align-items-center  ">
     <div>
     <h2 className=" text-light fw-bold text-capitalize mb-4 pb-4">login to your account</h2>
     <LoginForm />
     </div>
      </section>
    </>
  );
};

export default Loginpage;
