import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./UserContext";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useNavigate();
  const { updateCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [valid, setValid] = useState([true, true]);
  // console.debug(
  //     "SignupForm",
  //     "signup=", typeof signup,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  // );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await JoblyApi.signup(formData);
    if (typeof result === "string") {
      updateCurrentUser(formData.username);
      history("/companies");
    } else {
      setValid(result);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setValid([true, true]);
  }

  //to do - write and return the HTML and programmatic components of the physical form

  return (
    <div className="row">
      <div className="col"></div>
      <div className="form-box col-10 col-md-6 col-lg-5 col-xl-4 col-xxl-4">
        <form onSubmit={handleSubmit}>
          <p className="text-info my-3">Create an account</p>
          <div className="row mb-4 my-3 form-fields">
            <div className="col-12">
              <label htmlFor="username-su" className="form-label tag text-info">
                Username
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="username-su"
                aria-describedby="usernameHelp"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="user-name"
              />

              {/* User name validation */}
              {!valid[1] ? (
                <small className="text-center mt-1 text-danger">
                  * Username already exists, try a different username
                </small>
              ) : (
                ""
              )}
            </div>

            <div className="col-12">
              <label htmlFor="password-su" className="form-label tag text-info">
                Password
              </label>
              <input
                type="password"
                className="form-control mb-1"
                id="password-su"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="firstname-su"
                className="form-label tag text-info"
              >
                First name
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="firstname-su"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="lastname-su" className="form-label tag text-info">
                Last Name
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="lastname-su"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email-su" className="form-label tag text-info">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email-su"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Input Error Handling */}
            {!valid[0] ? (
              <small className="text-center mt-1 text-danger">
                * All fields are required
              </small>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn btn-info text-white mb-3 my-2">
            Submit
          </button>
        </form>
      </div>
      <div className="col"></div>
      <p className="my-3">
        Have an account? Please login
        <Link className="text-primary" to={"/login"}>
          {" "}
          here
        </Link>
      </p>
      
    </div>
  );
}

export default SignupForm;
