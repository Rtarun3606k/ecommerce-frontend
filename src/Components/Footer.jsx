import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Link to={"/seller/register"}>seller</Link>
      <Link to={"/seller/home"}>seller home</Link>
    </div>
  );
};

export default Footer;
