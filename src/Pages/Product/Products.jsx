import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../sellerpages/Components/ProductCard";
import "../../sellerpages/Profile.css";
import { get_cookies_data } from "../../Utility/Auth";
import { Link } from "react-router-dom";
import { url } from "../../data/URL";
const Products = () => {
  // const url = "http://localhost:5000";
  const [Loadingstate, setLoadingstate] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Simulate a network request or other async operation
    const loadData = async () => {
      setLoadingstate(true);
      await load_products();
      // Simulate a delay (e.g., fetch data from an API)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const load_products = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };
    const response = await fetch(`${url}/products/get_products`, options);
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.msg);
      setAllProducts(data.products);
    } else {
      console.log(data.msg);
    }
  };

  return (
    <>
      {Loadingstate ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="products">
          {allProducts.map((product) => {
            return (
              <>
                <Link
                  to={`/product/${product.id}/${product.name}`}
                  className="link"
                >
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image_url={`${url}/seller/get_image/${product.id}/1`}
                    best_seller={true}
                    rating={product.rating}
                  />
                </Link>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Products;
