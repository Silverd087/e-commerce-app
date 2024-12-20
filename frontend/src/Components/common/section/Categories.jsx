import React from "react";
import { ShoppingBag } from "lucide-react";

const categories = [
  {
    name: "Running",
    description: "High-performance running shoes",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    name: "Casual",
    description: "Everyday comfort wear",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
  },
  {
    name: "Sport",
    description: "Professional sports footwear",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
  },
  {
    name: "Limited Edition",
    description: "Exclusive collections",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ShoppingBag className="h-5 w-5 text-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
