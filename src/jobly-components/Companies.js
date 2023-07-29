import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import Company from "./Company";
import SearchCompanies from "./SearchCompanies";
import UserContext from "./UserContext";
const Companies = () => {
  const [loaded, setLoaded] = useState(false);
  const [companies, setCompanies] = useState([]);
  const { updateSelected , updateData } = useContext(UserContext);

  useEffect(() => {
    search();
    setLoaded(true);
    updateSelected("/");
    updateData(JSON.parse(localStorage.getItem("userdata")));
  }, []);

  

  const search = async (name) => {
    let comps = await JoblyApi.getCompanies(name);
    setCompanies(() => [...comps]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-lg-9">
          <SearchCompanies search={search} searchTitle={"companies"} />
          {loaded
            ? companies.map((company) => (
                <Company company={company} key={company.handle} />
              ))
            : ""}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Companies;
