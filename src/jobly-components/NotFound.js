import React from "react";
import nopage from "./Images/page-not-found.jpg";
const NotFound = () => {
  return (
    <div className="row">

      <div className="col"></div>
      <div className="col-7 my-5" style={{width:"450px",height:"450px"}}>
        <img src={nopage} alt="page not found" className="img-fluid" />
      </div>
      <div className="col"></div>
    </div>
  );
};

export default NotFound;
