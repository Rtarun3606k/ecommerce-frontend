import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
// import "../Register/Register.css";
import "../Pages/Register/Register.css";
import "../Pages/Login/Login.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { storedata } from "../Utility/utility";
import { useNavigate } from "react-router-dom";
import { url } from "../data/URL";

const SELLERLogin = () => {
  // const url = "http://localhost:5000";
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    loadData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    const body = {
      email: loginWithEmail ? email : undefined,
      phone_number: loginWithEmail ? undefined : phonenumber,
      password: password,
    };
    console.log(body);

    const response = await fetch(`${url}/seller/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.msg);
      toast.success(`${data.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Refresh Token: ", data.refresh_token);
      console.log("Access Token: ", data.access_token);
      storedata(data.refresh_token, data.access_token);
      navigation("/seller/home");
      window.location.reload();
    } else {
      toast.error(`${data.msg}`);
    }

    setIsRegistering(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setEmail("");
    setPhonenumber("");
    setLoginWithEmail(!loginWithEmail);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <center>
          <div className="box2">
            <div className="login-container">
              <h3>Seller Login</h3>
              <div className="input-box">
                <p>{loginWithEmail ? "Email" : "Phone Number"}</p>
                <input
                  type={loginWithEmail ? "email" : "text"}
                  placeholder={`Enter Your ${
                    loginWithEmail ? "Email" : "Phone Number"
                  }`}
                  name="identifier"
                  value={loginWithEmail ? email : phonenumber}
                  onChange={(e) => {
                    loginWithEmail
                      ? setEmail(e.target.value)
                      : setPhonenumber(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
              <div className="input-box">
                <p>Password</p>
                <div className="pass-btn">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    name="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control margin-0"
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="eye-btn"
                  >
                    <img
                      src={!showPassword ? "/closed.png" : "/eye.png"}
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="check-box">
                <input type="checkbox" onClick={toggleLoginMethod} />
                <span>Login with email</span>
              </div>
              {isRegistering ? (
                <div className="registering">
                  <div className="registering-img">
                    <img src="/loadinggif.gif" alt="" />
                  </div>
                  <div className="registering-text">
                    <p>Logging in...</p>
                  </div>
                </div>
              ) : (
                <button
                  className="login-register link register"
                  onClick={handleRegister}
                >
                  Login
                </button>
              )}
              <div className="action">
                Don't have an account?{" "}
                <Link to={"/seller/register"} className="color">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </center>
      )}
    </>
  );
};

export default SELLERLogin;
