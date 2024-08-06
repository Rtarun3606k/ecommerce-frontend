import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselFade from "../../Components/Imageslider/CarouselFade";
import Loading from "../../Components/Loading/Loading";
import { url } from "../../data/URL";

const ProductPage = ({}) => {
  const id = useParams();
  const productname = useParams();
  const [productdata, setProductdata] = useState({});
  const [Loadingstate, setLoadingstate] = useState(false);

  useEffect(() => {
    // Simulate a network request or other async operation
    const loadData = async () => {
      console.log(id.id);
      setLoadingstate(true);
      await load_products();
      // Simulate a delay (e.g., fetch data from an API)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const load_products = async () => {
    const response = await fetch(`${url}/products/get_product/${id.id}`);
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.msg);
      setProductdata(data.product);
      console.log(data.product);
      console.log(productdata);
    } else {
      console.log(data.msg);
    }
  };

  return (
    <>
      {Loadingstate ? (
        <Loading />
      ) : (
        <div className="boxParent">
          <p>{productdata.name}</p>
          <p>{productdata.id}</p>
          <p>{productdata.price}</p>
        </div>
      )}
    </>
  );
};

export default ProductPage;
