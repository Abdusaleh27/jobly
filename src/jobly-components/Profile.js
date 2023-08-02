import React, { useContext, useState } from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";

function Profile() {
  const { updateData, currentUser, userData,updateCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    password: "",
    firstName: userData ? userData.firstName : "",
    lastName: userData ? userData.lastName : "",
    email: userData ? userData.email : "",
  });
  const [valid, setValid] = useState([true, true]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await JoblyApi.updateProfile(formData);
    if (result[0] && result[1]) {
      updateData({ ...JSON.parse(localStorage.getItem("userdata")) });
      setFormData((data) => ({ ...data, password: "" }));
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

  return (
    <div className="row">
      <div className="col"></div>
      <div className="form-box col-8 col-md-6 col-lg-5 col-xl-4 col-xxl-4">
        <form onSubmit={handleSubmit}>
          <p className="text-info my-2">Update profile</p>
          <div className="row mb-4 my-3 form-fields">
            <div className="col-12">
              <label htmlFor="username-p" className="form-label tag text-info">
                Username
              </label>
              <p className="fw-bold text-danger">{currentUser}</p>
            </div>

            <div className="col-12 my-2">
              <label htmlFor="firstname-p" className="form-label tag text-info">
                First name
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="firstname-p"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 my-2">
              <label htmlFor="lastname-p" className="form-label tag text-info">
                Last Name
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="lastname-p"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 my-2">
              <label htmlFor="email-p" className="form-label tag text-info">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email-p"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 my-2">
              <label htmlFor="password-p" className="form-label tag text-info">
                Type password to confirm
              </label>
              <input
                type="password"
                className="form-control mb-1"
                id="password-p"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
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
            {!valid[1] ? (
              <small className="text-center mt-1 text-danger">
                * Invalid password
              </small>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn btn-primary mb-3 my-2">
            Submit
          </button>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default Profile;
