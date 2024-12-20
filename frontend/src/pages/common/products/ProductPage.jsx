import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useCart } from "../../../Context/CartContext"; // Importing the Cart Context

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center space-x-1">
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      {halfStar === 1 && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
    </div>
  );
};

export default function ProductPage() {
  const { id } = useParams();
  const url = "http://localhost:5001/api/products";
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    description: "",
    imageUrl: "",
    backgroundColor: "",
    color: [],
    size: [],
    sold: 0,
    stock: 0,
    rating: 0,
  });

  // State to store selected size and color
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Cart Context hook to manage the cart state
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("you need to login to add products to your cart");
    } else {
      // Ensure both size and color are selected before adding to the cart
      if (!selectedSize || !selectedColor) {
        alert("Please select a size and color!");
        return;
      }

      // Check if there's enough stock
      if (product.stock < quantity) {
        alert("Not enough stock!");
        return;
      }

      // Create the cart item object with the entire product
      const cartItem = {
        ...product, // Store the entire product object
        quantity: quantity,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      };

      // Add the item to the cart using the CartContext
      addToCart(cartItem);
      alert(`${product.name} has been added to your cart!`);
    }
  };

  return (
    <div
      className="flex space-x-4 flex-row-reverse items-center justify-around"
      style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}
    >
      <div className="grid justify-items-start w-3/6 flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex justify-between w-32">
          <p>{product.rating}</p>
          {renderStars(product.rating)}
        </div>

        <h1 className="text-3xl font-bold text-gray-900">${product.price}</h1>
        <p>
          <b className="text-lg font-semibold mb-2 text-black">Description</b>
        </p>
        <p className="text-gray-600">{product.description}</p>

        <p>
          <b className="text-lg font-semibold mb-2 text-black">Select Sizes</b>
        </p>
        <div className="flex flex-wrap space-x-4">
          {product.size?.map((size) => (
            <div key={size}>
              <button
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedSize === size
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                {size}
              </button>
            </div>
          ))}
        </div>

        <p>
          <b className="text-lg font-semibold mb-2 text-black">Select Colors</b>
        </p>
        <div className="flex flex-wrap space-x-4">
          {product.color?.map((color) => (
            <div key={color}>
              <button
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full ${
                  selectedColor === color ? "border-4 border-black" : ""
                }`}
              />
            </div>
          ))}
        </div>

        <p>
          <b className="text-lg font-semibold mb-2 text-black">Quantity</b>
        </p>
        <div className="flex items-center space-x-4">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 border rounded-lg"
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="px-3 py-1 border rounded-lg"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
      <div className=" w-2/5 h-screen relative">
        <img
          className="w-full h-full object-cover rounded-lg shadow-lg"
          style={{ backgroundColor: product.backgroundColor }}
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
    </div>
  );
}
