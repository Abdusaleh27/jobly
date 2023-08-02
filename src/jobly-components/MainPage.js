import React, { useState } from "react";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Companies from "./Companies";
import Profile from "./Profile";
import Jobs from "./Jobs";
import CompanyJobs from "./CompanyJobs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserContext from "./UserContext";
import NotFound from "./NotFound";
const MainPage = () => {
  const [selected, setSelected] = useState("/");
  const userName = JSON.parse(localStorage.getItem("user"));
  const data = JSON.parse(localStorage.getItem("userdata"));
  const [currentUser, setCurrentUser] = useState(userName);
  const [userData, setUserData] = useState(data);
  const updateData = (d) => setUserData(() => ({...d}));

  const updateCurrentUser = (user) => setCurrentUser(() => user);

  const updateSelected = (selection) => setSelected(selection);

  return (
    <div className="">
      <UserContext.Provider
        value={{
          currentUser,
          updateCurrentUser,
          userData,
          updateData,
          selected,
          updateSelected,
        }}
      >
        <BrowserRouter>
        <Navigation selected={selected} setSelected={setSelected} />
          {currentUser ? (
            <>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Companies />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/jobs" element={<Jobs />} />
                
                <Route path="/companies/:name" element={<CompanyJobs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default MainPage;
