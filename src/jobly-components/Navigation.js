import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import navlogo1 from "./Images/jobly-nav-logo2.jpg";
import UserContext from "./UserContext";
import mainLogo from "./Images/Jobly3.jpg";
const Navigation = ({ selected, setSelected }) => {
  const { currentUser, updateCurrentUser,userData } = useContext(UserContext);

  const handleClick = () => {
    localStorage.removeItem("user");
    updateCurrentUser(null);
  };

  return (
    <div>
      <div style={{ backgroundColor: "black" }} >
        <Link to="/">
          <img
            src={mainLogo}
            alt="main logo"
            style={{
              marginTop: "3px",
              marginBottom: "3px",
              width: "90px",
              borderRadius: "50%",
            }}
          />
        </Link>
      </div>
      {currentUser ? (
        <>
          <nav
            className="navbar  navbar-expand-sm "
            style={{ backgroundColor: "#c5aa6a" }}
          >
            <div className="container-fluid">
              <Link className="nav-comp text-light navbar-brand" to="/">
                
                  <img
                  className="rounded"
                  src={navlogo1}
                  alt="logo"
                  style={{
                    width: "100px",
                    height: "45px",
                  }}
                />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNavDropdown"
              >
                <ul className="navbar-nav ">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        selected === "/" ? "text-white" : ""
                      }`}
                      to="/companies"
                      onClick={() => setSelected("/")}
                    >
                      {" "}
                      Companies{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        selected === "/jobs" ? "text-white" : ""
                      }`}
                      to="/jobs"
                      onClick={() => setSelected("/jobs")}
                    >
                      {" "}
                      Jobs{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        selected === "/profile" ? "text-white" : ""
                      }`}
                      to="/profile"
                      onClick={() => setSelected("/profile")}
                    >
                      {" "}
                      Profile{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNavDropdown"
              >
                <ul className="navbar-nav logout">
                  <li className="nav-item" onClick={handleClick}>
                    <Link
                      className="nav-link text-white logout"
                      to="/"
                      style={{
                        border: "1px white solid",
                        borderRadius: "7px",
                        padding: "5px 10px",
                      }}
                    >
                      Logout {userData.firstName !== "" ? userData.firstName : currentUser}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navigation;
