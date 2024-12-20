import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/CardItem.css";

const CardItem = ({ product }) => {
  return (
    <div
      className="product_card"
      style={{ backgroundColor: product.backgroundColor }}
    >
      {/* Top Section: Image and Price */}
      <div
        className="top_card"
        style={{ backgroundColor: product.backgroundColor }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product_image"
        />
        {product.price && (
          <span className="product_price">€ {product.price}</span>
        )}
      </div>

      {/* Bottom Section: Name, Description, and View Button */}
      <div className="bottom_card">
        <div className="product_name">
          <h6>{product.name}</h6>
          <h4>{product.name}</h4>
        </div>
        <div className="product_description">
          <p>{product.description}</p>
        </div>

        <Link to={`/product/${product._id}`} className="view-product-btn">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
