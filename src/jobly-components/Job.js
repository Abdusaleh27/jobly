import React, { useState } from "react";
import "./Job.css";
const Job = ({ job, setApplied, applications }) => {
  const [shadow, setShadow] = useState("shadow");

  const handleMouse = (e) => {
    if (e.type === "mouseover") {
      setShadow("shadow-lg");
    } else {
      setShadow("shadow");
    }
  };
  const handleClick = () => {
    setApplied(job.id);
  };

  return (
    <div
      className={`row my-4 j-card rounded ${shadow} gx-1`}
      onMouseOver={handleMouse}
      onMouseLeave={handleMouse}
    >
      <div>
        <p className="job-title">{job.title}</p>
        <p className="job-description">
          <span>Company:</span> {job.companyName}
        </p>
        <p className="job-description">Salary : ${job.salary}</p>
        <p className="job-description">
          Equity : {job.equity === null ? "0" : job.equity}
        </p>
        <div className="apply-parent d-grid">
          <button
            className={`btn btn-danger apply ${
              applications.includes(job.id) ? "disabled" : ""
            }`}
            onClick={handleClick}
          >
            {applications.includes(job.id) ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
