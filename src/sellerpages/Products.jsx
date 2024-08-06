import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  delete_cookies_storedata,
  edit_access_token,
  store_cookies_data,
  get_cookies_data,
} from "../Utility/Auth";
import { check_token } from "../Utility/utility";
import Loading from "../Components/Loading/Loading";
import ProductCard from "./Components/ProductCard";
import { useNavigate } from "react-router-dom";

const SellerProduct = () => {
  const navigate = useNavigate();
  const [Loadingstate, setLoadingstate] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image1: "",
    mimetype1: "",
    image2: "",
    mimetype2: "",
    image3: "",
    mimetype3: "",
    stock: "",
    category: "",
    colors: "",
  });
  const [allProducts, setAllProducts] = useState([]);

  const url = "http://localhost:5000";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData((prevData) => ({
        ...prevData,
        [name]: reader.result.split(",")[1], // Save base64 part only
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
      setProductData((prevData) => ({
        ...prevData,
        [`mimetype${name.charAt(5)}`]: file.type,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    check_token();
    try {
      const token = get_cookies_data(false, true); // Assumes you have stored the JWT token in localStorage
      const response = await axios.post(
        `${url}/seller/upload_product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      alert("Product uploaded successfully");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product");
    }
  };

  const load_products = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_cookies_data(false, true)}`,
      },
    };
    const response = await fetch(`${url}/seller/get_products`, options);
    const data = await response.json();
    if (response.status === 200) {
      console.log(data.msg);
      setAllProducts(data.products);
    } else {
      console.log(data.msg);
    }
  };

  useEffect(() => {
    // Simulate a network request or other async operation
    const loadData = async () => {
      setLoadingstate(true);
      await checker();
      await load_products();
      // Simulate a delay (e.g., fetch data from an API)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const checker = async () => {
    const value = await check_token();
    if (value === false) {
      delete_cookies_storedata();
      navigate("/seller/login");
    }
  };

  const arr = [1, 2, 3];

  return (
    <>
      {Loadingstate ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Image 1:</label>
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label>Image 2:</label>
              <input type="file" name="image2" onChange={handleFileChange} />
            </div>
            <div>
              <label>Image 3:</label>
              <input type="file" name="image3" onChange={handleFileChange} />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Colors:</label>
              <input
                type="text"
                name="colors"
                value={productData.colors}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Upload Product</button>
          </form>

          <div className="products">
            {allProducts.map((product) => {
              console.log(product);
              return (
                <>
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image_url={`${url}/seller/get_image/${product.id}/1`}
                    best_seller={true}
                    rating={product.rating}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SellerProduct;
