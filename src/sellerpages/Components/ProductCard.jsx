import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  name,
  price,
  category,
  image_url,
  best_seller,
  rating,
}) => {
  const url = "http://localhost:5000";
  const name_shortner = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  // Function to generate star elements based on the rating
  const renderStars = (rating) => {
    if (rating != null) {
      const totalStars = 5; // Assuming a 5-star rating system
      const stars = [];
      for (let i = 1; i <= totalStars; i++) {
        stars.push(
          <li key={i} className={i <= rating ? "filled-star" : "empty-star"}>
            &#9733;
          </li>
        );
      }
      return stars;
    }
    return (
      <>
        <li key={1} className="filled-star">
          &#9733;
        </li>
        <li key={1} className="empty-star">
          &#9733;
        </li>
        <li key={1} className="empty-star">
          &#9733;
        </li>
        <li key={1} className="empty-star">
          &#9733;
        </li>
        <li key={1} className="empty-star">
          &#9733;
        </li>
      </>
    );
  };

  return (
    <div className="container">
      {best_seller ? (
        <>
          <div className="special">
            <p>Best Seller</p>
          </div>
        </>
      ) : null}
      <div className="image">
        <img src={image_url} alt="" className="banner-img" />
      </div>
      <div className="name-container">
        <p>{name_shortner(name)}</p>
      </div>
      <div className="category">
        <p>{category}</p>
      </div>
      <div className="rating-price">
        <div className="stars">
          <ul className="stars-ul">{renderStars(rating)}</ul>
        </div>
        <div className="price">
          <p>${price}</p>
        </div>
      </div>
      <div className="details-card">
        <button className="details">
          <img src="/info.png" alt="Info" />
          <p>More Details</p>
        </button>
        <button className="cart">
          <img src="/cart.png" alt="Cart" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
