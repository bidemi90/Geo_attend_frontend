import React from "react";
import SignUpForm from "../components/SignUpForm";

const Signuppage = () => {
  return (
    <>
       <section className=" loginandsigninformholder h-100 d-flex justify-content-center align-items-center  ">
     <div>
     <h2 className=" text-light fw-bold text-capitalize mb-4 pb-4">fill form to create a new account</h2>
     <SignUpForm />
     </div>
      </section>
    </>
  );
};

export default Signuppage;
