import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import SearchCompanies from "./SearchCompanies";
import Job from "./Job";
import UserContext from "./UserContext";
import NotFound from "./NotFound";

const Jobs = ({ allJobs = true, companyName }) => {
  const [loaded, setLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState("");
  const { updateSelected, updateData, userData } = useContext(UserContext);
  const INTIAL_APPS = userData ? userData.applications : [];
  const [applications, setApplications] = useState(INTIAL_APPS);

  useEffect(() => {
    search();
    setLoaded(true);
    let newData = JSON.parse(localStorage.getItem("userdata"));
    updateData(newData);
    newData
      ? setApplications(newData.applications)
      : setApplications(INTIAL_APPS);
    updateSelected("/jobs");
  }, [loaded]);

  const search = async (name) => {
    let comps = await JoblyApi.getJobs(name);
    if (!allJobs) {
      comps = comps.filter((comp) => comp.companyHandle === companyName);
      if (comps !== undefined && comps.length > 0) {
        setName(comps[0].companyName);
      }
    }
    setJobs(() => [...comps]);
  };

  const setApplied = async (jobID) => {
    await JoblyApi.applyToJob(jobID);
    let newData = JSON.parse(localStorage.getItem("userdata"));
    updateData(newData);
    setApplications(newData.applications);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-md-9 col-lg-8">
          {allJobs ? (
            <SearchCompanies search={search} searchTitle={"Jobs"} />
          ) : (
            <p className="company-name" style={{ paddingTop: "40px" }}>
              {name}
            </p>
          )}

          {loaded ? (
            jobs.length > 0 ? (
              jobs.map((job) => (
                <Job
                  job={job}
                  key={job.id}
                  setApplied={setApplied}
                  applications={applications}
                />
              ))
            ) : (
              <NotFound />
            )
          ) : (
            ""
          )}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Jobs;
