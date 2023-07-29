import React, { useEffect, useState } from "react";

const SearchCompanies = ({ search,searchTitle }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await search(query);
  };
  const handleChange = async (e) => {
    let {value} = e.target;
    setQuery(value);
    search(value);  
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="row my-3">
        <div className="mb-3 col-sm-7 col-lg-6 col-xl-4">
          <input
            type="text"
            className="form-control"
            id="search-bar"
            aria-describedby="searchBar"
            placeholder={`Search for ${searchTitle}`}
            value={query}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid col-sm-auto d-sm-block">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchCompanies;
