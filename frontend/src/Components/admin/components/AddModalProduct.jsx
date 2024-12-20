import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AddProductModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    imageUrl: "",
    backgroundColor: "",
    stock: 0,
    category: [],
    size: [],
    color: [],
  });

  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedArray = checked
        ? [...prevState[field], value]
        : prevState[field].filter((item) => item !== value);
      return { ...prevState, [field]: updatedArray };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (userId) {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category[0] || "",
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      axios
        .post("http://localhost:5001/api/products", productData, { headers })
        .then((response) => {
          alert(response.data.msg);
          onClose();
          setFormData({
            name: "",
            brand: "",
            price: "",
            description: "",
            imageUrl: "",
            backgroundColor: "",
            stock: "",
            size: [],
            color: [],
            category: [],
          });
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          alert(error.response?.data?.msg || "An error occurred");
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full overflow-auto">
        <h2 className="text-xl font-semibold text-center mb-6">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Brand */}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              id="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Background Color */}
          <div className="mb-4">
            <label
              htmlFor="backgroundColor"
              className="block text-sm font-medium text-gray-700"
            >
              Background Color
            </label>
            <input
              id="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              type="color"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Size (checkboxes) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={size}
                    value={size}
                    checked={formData.size.includes(size)}
                    onChange={(e) => handleCheckboxChange(e, "size")}
                    className="mr-2"
                  />
                  <label htmlFor={size} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Color (checkboxes) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={color}
                    value={color}
                    checked={formData.color.includes(color)}
                    onChange={(e) => handleCheckboxChange(e, "color")}
                    className="mr-2"
                  />
                  <label htmlFor={color} className="text-sm">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Category (checkboxes) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Casual", "Sport", "Limited Edition", "Running"].map(
                (category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      checked={formData.category.includes(category)}
                      onChange={(e) => handleCheckboxChange(e, "category")}
                      className="mr-2"
                    />
                    <label htmlFor={category} className="text-sm">
                      {category}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
