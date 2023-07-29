import React, { useState } from "react";
import "./Company.css";
import { Link } from "react-router-dom";
import Job from "./Job";
const Company = ({ company }) => {
  const [shadow, setShadow] = useState("shadow-sm");
  const handleMouse = (e) => {
    if (e.type === "mouseover") {
      setShadow("shadow");
    } else {
      setShadow("shadow-sm");
    }
  };

  return (
    <Link to={`/companies/${company.handle}`}>
      <div className="">
        <div
          className={`row my-4 job-card rounded ${shadow} gx-1`}
          onMouseOver={handleMouse}
          onMouseLeave={handleMouse}
        >
          <div>
            <p className="company-name">{company.name}</p>
            <p className="company-description">{company.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Company;
