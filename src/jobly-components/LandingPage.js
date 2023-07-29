import React from "react";
import "./LandingPage.css";
import bgimage from "./welcomeBG.JPG";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
 
    if (e.target.innerText === "Login") navigate("/login");
    if (e.target.innerText === "Sign up") navigate("/signup");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="p-1 col-xl-6 col-lg-7 col-md-9 shadow greeting rounded ">
          <img
            src={bgimage}
            alt="background"
            className="img-fluid greeting-image rounded"
          ></img>
        </div>
      </div>
      <div>
        <button
          className="btn btn-secondary mx-2 mt-3 text-light"
          onClick={handleClick}
        >
          Login
        </button>
        <button
          className="btn btn-secondary mx-1 mt-3 text-light button2"
          onClick={handleClick}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
