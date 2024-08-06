import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselFade from "../../Components/Imageslider/CarouselFade";

const ProductPage = ({}) => {
  const id = useParams();
  const productname = useParams();

  useEffect(() => {
    console.log("Product Page Mounted");
    console.log(id);
    console.log(productname);
  }, []);

  return (
    <>
      <div className="boxParent">
        <CarouselFade />
      </div>
    </>
  );
};

export default ProductPage;
