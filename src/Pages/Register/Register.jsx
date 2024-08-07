// Register.js
import React, { useState, useEffect, useContext } from "react";
import "./Register.css";
import { fields } from "../../data/InputFields";
import { optionsC } from "../../Utility/utility";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { AuthContext } from "../../AuthContext";
import { url } from "../../data/URL";

function Register() {
  // const url = "http://localhost:5000";
  const [Loadingstate, setLoadingstate] = useState(false);
  const [Loadingstateregister, setLoadingstateregister] = useState(false);
  const { setIsTokenValid } = useContext(AuthContext);

  useEffect(() => {
    const loadData = async () => {
      setLoadingstate(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
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
    Gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handelregister = async (e) => {
    e.preventDefault();
    setLoadingstateregister(true);
    console.log("working");

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
      Alternate_Phone_Number: formData.Alternate_Phone_Number,
      Alternate_Email: formData.Alternate_Email,
      Alternate_Address: formData.Alternate_Address,
      Gender: formData.Gender,
    };

    const response = await fetch(`${url}/loginRegister/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.access_token && data.refresh_token) {
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      setIsTokenValid(true);
      window.location.href = "/";
    } else {
      console.log("Registration failed");
    }

    setLoadingstateregister(false);
  };

  return Loadingstate ? (
    <Loading />
  ) : (
    <div className="register">
      <div className="left-reg elevation-8">
        <img src="register-left.png" alt="register img" />
      </div>
      <div className="right-reg">
        <div className="right-head">
          <div className="right-head-content">
            <h2>Register</h2>
            <p>Fill in your details to register</p>
          </div>
        </div>
        <form className="register-form" onSubmit={handelregister}>
          <div className="register-elem">
            {fields.map((field, index) =>
              field.options ? (
                <select
                  key={index}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  {optionsC.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )
            )}
          </div>
          <button type="submit" className="register-button">
            {Loadingstateregister ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="reg-bottom">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
