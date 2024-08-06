import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navigation from "../sellerpages/NavFoloder/Navigation";
const Layout_seller = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Navigation />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
      footer seller
    </div>
  );
};

export default Layout_seller;
