import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Carousel({ products }) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 3;
  const filteredProducts = products.sort((a, b) => b.sold - b.sold).slice(0, 6);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current products
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <div className="flex space-x-4">
            <button
              onClick={prevPage}
              className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="text-lg font-bold">${product.price}</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <Link to={`/product/${product._id}`}>
                  <button
                    className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors group"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? "bg-black w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
