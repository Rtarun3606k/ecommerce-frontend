import React from "react";
import { Link } from "react-router-dom";
import "./searchtile.css";
import { fields as fd } from "../../data/InputFields";

const SearchTile = ({ fields }) => {
  return (
    <div className="tile hidden-lg-screen hidden">
      {fields.map((field) => {
        return (
          <div className="search-tile" key={field.id}>
            {/* {field.label} */}
            {field.title}
          </div>
        );
      })}
      {/* {fd.map((field) => {
        return (
          <div className="search-tile" key={field.id}>
            {field.label}
          </div>
        );
      })} */}
    </div>
  );
};

export default SearchTile;
