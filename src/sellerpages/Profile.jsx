import React, { useState, useEffect, useRef } from "react";
import Loading from "../Components/Loading/Loading";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { check_token, delete_storedata } from "../Utility/utility";
import "../Components/NavFoloder/Nav.css";
import {
  delete_cookies_storedata,
  edit_access_token,
  store_cookies_data,
  get_cookies_data,
} from "../Utility/Auth";
import { url } from "../data/URL";

const SELLERProfile = () => {
  const navigate = useNavigate();
  // const url = "http://localhost:5000";
  const [Loadingstate, setLoadingstate] = useState(false);
  const [UserData, setUserData] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handel_user_data = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };

    try {
      const response = await fetch(`${url}/seller/get_user`, options);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.msg);
        setUserData(data.user_data); // Update state with user_data object
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingstate(true);
      await handel_click(); // Check if token is valid
      await handel_user_data(); // Await the user data fetching
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const handel_click = async () => {
    const isTokenValid = await check_token();
    if (isTokenValid) {
      console.log("token is valid");
      navigate("/seller/profile");
    } else {
      console.log("token is not valid");
      console.log("deleting data");
      delete_storedata();
      navigate("/seller/login");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <>
      {Loadingstate ? (
        <Loading />
      ) : (
        <div className="profile-container">
          <div className="right-profile">
            <center>
              <h2>General Information</h2>
            </center>
            <ul className="profile_ul">
              <li className="profile-li">
                <label htmlFor="">First Name</label>
                <p>{UserData.first_name}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">Last Name</label>
                <p>{UserData.last_name}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">Phone Number</label>
                <p>{UserData.phone_number}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">Email</label>
                <p>{UserData.email}</p>
              </li>

              <li className="profile-li">
                <label htmlFor="">Address</label>
                <p>{UserData.address}</p>
              </li>
            </ul>

            <ul className="profile_ul">
              <li className="profile-li flex-dir-row">
                <button
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className="profile-btns"
                >
                  My Orders
                  <img src="/orders.png" alt="" className="user-img" />
                </button>
                <button
                  onClick={() => {
                    navigate("/seller/dashboard");
                  }}
                  className="profile-btns"
                >
                  Offers
                  <img src="/offer.png" alt="" className="user-img" />
                </button>
                <div className="dropdown" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="profile-btns">
                    Settings
                    <img src="/settings.png" alt="" className="user-img" />
                  </button>
                  {dropdownVisible && (
                    <div className="dropdown-content">
                      <button
                        onClick={() => navigate("/seller/change-password")}
                      >
                        Change Password
                      </button>
                      <button onClick={() => navigate("/seller/update")}>
                        Update Profile
                      </button>
                      <button
                        onClick={() => {
                          delete_storedata();
                          navigate("/seller/login");
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>

            {/* drop box */}
          </div>
          <div className="left-profile">
            <center>
              <h2>Store Information</h2>
            </center>
            <ul className="profile_ul">
              <li className="profile-li">
                <label htmlFor="">Store Name</label>
                <p>{UserData.store_name}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">Country</label>
                <p>{UserData.country}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">State</label>
                <p>{UserData.state}</p>
              </li>
              <li className="profile-li">
                <label htmlFor="">Zip Code</label>
                <p>{UserData.zip_code}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SELLERProfile;
