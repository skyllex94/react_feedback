import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function Signin() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e, keyName) => {
    setFormData((prevState) => ({
      ...prevState,
      [keyName]: e.target.value,
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <main>
          <form>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />

            <input
              type={showPass ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />

            <img
              src={visibilityIcon}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPass((prevState) => !prevState)}
            />
            <Link to="/forgotpass" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="singInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/*  Google Auth  */}

          <Link to="/signup" className="registerLink">
            Create an Account
          </Link>
        </main>
      </div>
    </>
  );
}

export default Signin;
