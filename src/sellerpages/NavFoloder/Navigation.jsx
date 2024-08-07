import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navigation_seller } from "../../data/Nav";
import "./Nav.css";
import SearchTile from "./SearchTile";
import { AuthContext } from "../../AuthContext";
import { check_token, delete_storedata } from "../../Utility/utility";
import { url } from "../../data/URL";

const Navigation = () => {
  const navigate = useNavigate();
  const { isTokenValid, logout, setIsTokenValid } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    console.log("Checking token in session storage:", token);
    setIsTokenValid(!!token);
  }, [setIsTokenValid]);

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    navigate("/seller/login");
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleNavToggle = () => {
    const nav = document.querySelector(".nav-div");
    const navHeight = document.querySelector(".nav2");

    if (nav.style.display === "none" || nav.style.display === "") {
      nav.style.display = "block";
      setTimeout(() => {
        navHeight.style.height = "495px";
      }, 10);
    } else {
      navHeight.style.height = "80px";
      setTimeout(() => {
        nav.style.display = "none";
      }, 30);
    }
  };

  const handel_click = async () => {
    // const isTokenValid = await check_access_token_is_valid();
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

  console.log("isTokenValid:", isTokenValid);

  return (
    <div className="navigation">
      <div className="nav2 elevation-4">
        <div className="main">
          <div className="logo">
            <NavLink to={"/seller/dashboard"}>
              <img src="/l2.png" alt="logo" />
            </NavLink>
          </div>
          <nav className="nav-div">
            <ul className="nav-elemants">
              {navigation_seller.map((item) => (
                <li className="elements" key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "element-in-link active-elememts elements link"
                        : "element-in-link link elements"
                    }
                    to={item.url}
                  >
                    {item.title}
                    <img src={`/${item.img}`} alt="" className="user-img" />
                  </NavLink>
                </li>
              ))}
              <li className="link-for-nav-user">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "link-for-nav-user-active link-for-nav-user"
                      : "link-for-nav-user"
                  }
                  to={"/seller/profile"}
                >
                  Profile
                  <img src="/user.png" alt="" className="user-img" />
                </NavLink>
              </li>
              <li className="link-for-nav-user">
                {isTokenValid ? (
                  <button
                    className="login-register link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to={"/seller/login"}
                    className={({ isActive }) =>
                      isActive
                        ? "login-register-active margin-top"
                        : "margin-top"
                    }
                  >
                    <button className="login-register link">Login</button>
                  </NavLink>
                )}
              </li>
              <div className="search-parent hidden">
                <div className="search-bar-box2">
                  <input
                    type="search"
                    className="search-bar"
                    placeholder="Search for products"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button className="search-btn">
                    <img
                      src="/search.png"
                      alt="search button"
                      className="search-img"
                    />
                  </button>
                </div>
                {search.length > 3 ? <SearchTile fields={navigation} /> : ""}
              </div>
            </ul>
          </nav>
        </div>
        <div className="button-side">
          {isTokenValid ? (
            <button className="login-register link" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink
              to={"/seller/login"}
              className={({ isActive }) =>
                isActive ? "login-register-active" : ""
              }
            >
              <button className="login-register link">Login</button>
            </NavLink>
          )}

          <img
            src="/user.png"
            onClick={handel_click}
            alt=""
            className="user-img"
          />
        </div>
        <div className="button-side2">
          <button className="login-register link" onClick={handleNavToggle}>
            <img src="/menu.png" alt="menu" className="menu-img" />
          </button>
        </div>
      </div>
      <div className="search-parent">
        <div className="search-bar-box elevation-4">
          <input
            type="search"
            className="search-bar"
            placeholder="Search for products"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="search-btn">
            <img src="/search.png" alt="search button" className="search-img" />
          </button>
        </div>
        <div className="hidden-lg-screen">
          {search.length > 3 ? <SearchTile fields={navigation} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
