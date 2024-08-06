import React from "react";
import Register from "../Pages/Register/Register";
import Navigation from "./NavFoloder/Navigation";
import Footer from "./Footer";

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Navigation />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Layout;
