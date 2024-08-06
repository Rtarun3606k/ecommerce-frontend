import React, { useState, useEffect, useRef } from "react";
import Loading from "../../Components/Loading/Loading";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { check_token, delete_storedata } from "../../Utility/utility";
import "../../Components/NavFoloder/Nav.css";
import { toast } from "react-toastify";
import { get_cookies_data } from "../../Utility/Auth";

const Update = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [Loadingstate, setLoadingstate] = useState(false);
  const [UserData, setUserData] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [ph, setph] = useState("");
  const [alph, setalph] = useState("");
  const [email, setemail] = useState("");
  const [alemail, setalemail] = useState("");
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [aladdress, setaladdress] = useState("");
  const [dob, setdob] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [city, setcity] = useState("");
  //   alteret values
  const [isaddress, setisaddress] = useState(false);
  const [isph, setisph] = useState(false);
  const [isemail, setisemail] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handel_user_data = async () => {
    setIsUpdating(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };

    try {
      const response = await fetch(`${url}/loginRegister/get_user`, options);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.msg);
        setUserData(data.user_data);
        setph(data.user_data.phone_number);
        setalph(data.user_data.alternate_phone_number);
        setemail(data.user_data.email);
        setalemail(data.user_data.alternate_email);
        setaddress(data.user_data.address);
        setaladdress(data.user_data.alterate_address);
        setgender(data.user_data.gender);
        setfirst(data.user_data.first_name);
        setlast(data.user_data.last_name);
        setdob(data.user_data.date_of_birth);
        setcountry(data.user_data.country);
        setstate(data.user_data.state);
        setzipcode(data.user_data.zip_code);
        setcity(data.user_data.city);
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handel_update_data = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
      body: JSON.stringify({
        phone_number: ph,
        alternate_phone_number: alph,
        email: email,
        first_name: first,
        last_name: last,
        gender: gender,
        address: address,
        alternate_address: aladdress,
        date_of_birth: dob,
        country: country,
        state: state,
        zip_code: zipcode,
        city: city,
        alternate_email: alemail,
      }),
    };

    try {
      await handel_click();
      const response = await fetch(`${url}/loginRegister/update_user`, options);
      const data = await response.json();
      if (response.status === 201) {
        console.log(data.msg);
        toast.success(data.msg);
        navigate("/profile");
        // Optionally, navigate to profile or show success message
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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
      navigate("/update");
    } else {
      console.log("token is not valid");
      console.log("deleting data");
      delete_storedata();
      navigate("/login");
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
                <input
                  type="text"
                  value={first}
                  onChange={(e) => setfirst(e.target.value)}
                  name="first"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={last}
                  onChange={(e) => setlast(e.target.value)}
                  name="last"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  value={ph}
                  onChange={(e) => setph(e.target.value)}
                  name="phone_number"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  name="email"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Gender</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  name="gender"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Address</label>
                <input
                  type="textarea"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  name="address"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="address">
                  Alternate Address same as Address
                </label>
                <input
                  id="address"
                  type="checkbox"
                  checked={isaddress}
                  onChange={() => {
                    console.log("ph ", isph);
                    setisaddress(!isaddress);
                    console.log("ph ", isph);
                    // setisph(!isph);
                    // console.log("ph ", isph);
                    isAlteraddress();
                  }}
                  name="address"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="email">Alternate email same as email</label>
                <input
                  id="email"
                  type="checkbox"
                  checked={isemail}
                  onChange={() => {
                    console.log("ph ", isph);
                    setisemail(!isemail);
                    console.log("ph ", isph);
                    // setisph(!isph);
                    // console.log("ph ", isph);
                    isAlteremail();
                  }}
                  name="email"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="phone_number">
                  Alternate phone number same as phone number
                </label>
                <input
                  id="phone_number"
                  type="checkbox"
                  checked={isph}
                  onChange={() => {
                    console.log("ph ", isph);
                    setisph(!isph);
                    console.log("ph ", isph);
                    // setisph(!isph);
                    // console.log("ph ", isph);
                    isAlterph();
                  }}
                  name="phone_number"
                />
              </li>
            </ul>
          </div>
          <div className="left-profile">
            <center>
              <h2>Personal Information</h2>
            </center>
            <ul className="profile_ul">
              <li className="profile-li">
                <label htmlFor="">Date of birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  name="date_of_birth"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Alternate Phone Number</label>
                <input
                  type="text"
                  value={alph}
                  onChange={(e) => setalph(e.target.value)}
                  name="alternate_phone_number"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Alternate Email</label>
                <input
                  type="email"
                  value={alemail}
                  onChange={(e) => setalemail(e.target.value)}
                  name="alternate_email"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Alternate Address</label>
                <input
                  type="textarea"
                  value={aladdress}
                  onChange={(e) => setaladdress(e.target.value)}
                  name="aladdress"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                  name="country"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                  name="state"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">Zip Code</label>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setzipcode(e.target.value)}
                  name="zip_code"
                />
              </li>
              <li className="profile-li">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  name="city"
                />
              </li>
            </ul>

            {isUpdating ? (
              <div className="registering">
                <div className="registering-img">
                  <img src="/loadinggif.gif" alt="" />
                </div>
                <div className="registering-text">
                  <p>Updating...</p>
                </div>
              </div>
            ) : (
              <button
                className="login-register link register"
                onClick={handel_update_data}
              >
                Update
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
