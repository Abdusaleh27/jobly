import React from "react";
import { useParams } from "react-router-dom";
import Jobs from "./Jobs";

const CompanyJobs = ()=>{
    const params = useParams();
    return(
        <div><Jobs companyName={params.name} allJobs={false} /></div>
    )
}

export default CompanyJobs;