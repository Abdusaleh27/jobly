import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import JoblyApi from "./api";
import UserContext from "./UserContext";
//import Alert from "../common/Alert";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useNavigate();
  const { updateCurrentUser, userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [valid, setValid] = useState(true);

  // console.debug(
  //   "LoginForm",
  //   "login=",
  //   typeof login,
  //   "formData=",
  //   formData,
  //   "formErrors",
  //   formErrors
  // );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    if(userData) await JoblyApi.saveProfile(userData);
    let result = await JoblyApi.login(formData);

    console.log("token is ", result);
    if (result) {
      updateCurrentUser(formData.username);
      history("/companies");
    } else {
      setValid(false);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
    setValid(true);
  }

  //to do - write and return the HTML and programmatic components of the physical form

  return (
    <div className="row">
      <div className="col"></div>
      <div className="form-box col-8 col-md-7 col-lg-7 col-xl-5">
        <form onSubmit={handleSubmit}>
          <p className="text-info my-3">Please login!</p>
          <div className="row mb-4 my-3 form-fields">
            <div className="col-md-6 my-2">
              <label
                htmlFor="username"
                className="form-label tag text-info text-left"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="usernameHelp"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 my-2">
              <label htmlFor="password" className="form-label tag text-info">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {valid ? (
              ""
            ) : (
              <small className="text-danger text-center">
                * Invalid username/password combo{" "}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-info text-white mb-3">
            Login
          </button>
        </form>
      </div>
      <div className="col"></div>
      <p className="my-3">
        Don't have an account! Make new account
        <Link className="text-primary" to={"/signup"}>
          {" "}
          here
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
