import React, { useState, useEffect, useRef } from "react";
import Loading from "../Components/Loading/Loading";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";
import { check_token, delete_storedata } from "../Utility/utility";
import "../Components/NavFoloder/Navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../data/URL";

const SELLERRegister = () => {
  // const url = "http://localhost:5000";
  const [Loadingstate, setLoadingstate] = useState(false);
  const [isRegistring, setisRegistring] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Phone_Number: "",
    Address: "",
    City: "",
    State: "",
    Zip_Code: "",
    Country: "",
    Date_of_Birth: "",
    Alternate_Phone_Number: "",
    Alternate_Email: "",
    Alternate_Address: "",
    Store_Name: "",
    Retype_Password: "",
  });

  const password_check = () => {
    if (formData.Password !== formData.Retype_Password) {
      return toast.error("Password does not match");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    password_check();
    setisRegistring(true);
    const body = {
      First_Name: formData.First_Name,
      Last_Name: formData.Last_Name,
      Email: formData.Email,
      Password: formData.Password,
      Phone_Number: formData.Phone_Number,
      Address: formData.Address,
      City: formData.City,
      State: formData.State,
      Zip_Code: formData.Zip_Code,
      Country: formData.Country,
      Date_of_Birth: formData.Date_of_Birth,
      Store_Name: formData.Store_Name,
      Alternate_Address: formData.Alternate_Address,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${url}/seller/register`, options);
      const data = await response.json();
      if (response.status === 201) {
        console.log(data.message);
        navigate("/seller/home");
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(`error ${error}`);
    } finally {
      setisRegistring(false);
    }
  };

  const isAlteraddress = () => {
    if (!isaddress) {
      setaladdress(address);
    } else {
      setaladdress("");
    }
  };

  const isAlteremail = () => {
    if (!isemail) {
      setalemail(email);
    } else {
      setalemail("");
    }
  };

  const isAlterph = () => {
    if (!isph) {
      setalph(ph);
    } else {
      setalph("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {Loadingstate ? (
        <Loading />
      ) : (
        <div className="profile-container">
          <div className="right-profile">
            <center>
              <h2>Seller Registration</h2>
            </center>
            <ul className="profile_ul">
              <li className="profile-li">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  value={formData.First_Name}
                  onChange={handleInputChange}
                  name="First_Name"
                  placeholder="First Name"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={formData.Last_Name}
                  onChange={handleInputChange}
                  name="Last_Name"
                  placeholder="Last Name"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  value={formData.Phone_Number}
                  onChange={handleInputChange}
                  name="Phone_Number"
                  placeholder="Phone Number"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Password</label>
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.Password}
                    onChange={handleInputChange}
                    name="Password"
                    placeholder="Password"
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
              </li>
              <li className="profile-li">
                <label htmlFor="">Retype Password</label>
                <input
                  type="password"
                  value={formData.Retype_Password}
                  onChange={handleInputChange}
                  name="Retype_Password"
                  placeholder="Retype Password"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  name="Email"
                  placeholder="Email"
                />
              </li>

              <li className="profile-li">
                <label htmlFor="">Address</label>
                <input
                  type="textarea"
                  value={formData.Address}
                  onChange={handleInputChange}
                  name="Address"
                  placeholder="Address"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  value={formData.Country}
                  onChange={handleInputChange}
                  name="Country"
                  placeholder="Country"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  value={formData.State}
                  onChange={handleInputChange}
                  name="State"
                  placeholder="State"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  value={formData.City}
                  onChange={handleInputChange}
                  name="City"
                  placeholder="City"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Zip Code</label>
                <input
                  type="text"
                  value={formData.Zip_Code}
                  onChange={handleInputChange}
                  name="Zip_Code"
                  placeholder="Zip Code"
                />
              </li>
            </ul>

            {isRegistring ? (
              <div className="registering">
                <div className="registering-img">
                  <img src="/loadinggif.gif" alt="" />
                </div>
                <div className="registering-text">
                  <p>Registering...</p>
                </div>
              </div>
            ) : (
              <button
                className="login-register link register"
                onClick={handleRegister}
              >
                Register
              </button>
            )}
            <center>
              <div className="action">
                Already have an account?{" "}
                <Link
                  to={"/seller/login"}
                  className="color"
                  style={{ color: "orange" }}
                >
                  Login
                </Link>
              </div>
            </center>
          </div>
        </div>
      )}
    </>
  );
};

export default SELLERRegister;
