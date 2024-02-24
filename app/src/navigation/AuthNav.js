import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";
import "../App.css";

// import "bootstrap/dist/css/bootstrap.min.css";

// import Navbar from "../components/Navbar";

// import SignUp from "../auth/SignUp"
import LoginPage from "../screens/Login";
import NotFound from "../screens/NotFound";
import Support from "../screens/Support";
import PrivacyScreen from "../screens/Privacy";

const AuthNav = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          {/* <Route path="/SignUp" element={<SignUp />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<PrivacyScreen />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default AuthNav;
