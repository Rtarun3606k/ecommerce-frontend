import React from "react";
import { Outlet, Link } from "react-router-dom";
// import Navigation from "./NavFoloder/Navigation";
import Navigation from "../../Components/NavFoloder/Navigation";
const ProductLayout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <Navigation isInside={true} /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
      {/* footer seller */}
    </div>
  );
};

export default ProductLayout;
