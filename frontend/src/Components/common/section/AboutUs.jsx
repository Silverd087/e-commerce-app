import React from "react";
import { Award, Truck, RefreshCw } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">About Sbabeet</h2>
          <p className="text-gray-600 leading-relaxed">
            We're passionate about providing the perfect blend of style,
            comfort, and quality in every pair of shoes. With over a decade of
            experience in footwear retail, we understand what makes the perfect
            shoe for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Only the finest materials and craftsmanship go into our products
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Free shipping on all orders with quick delivery times
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">
              30-day return policy for a hassle-free shopping experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
