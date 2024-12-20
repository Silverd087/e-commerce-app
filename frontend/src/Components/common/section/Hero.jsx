import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative h-screen object-cover overflow-hidden bg-gray-50 bg-[url(https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80)]">
      <div className="relative z-10 py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Step into
              <span className="block text-orange-600 mt-2">
                Your Perfect Fit
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Discover our curated collection of premium footwear, designed for
              comfort and styled for confidence. From classic elegance to modern
              trends.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="gap-2 bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center">
                Shop Now <ShoppingBag size={20} />
              </button>
              <Link to="/product">
                <button className="gap-2 bg-white text-black border-2 border-black hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center">
                  Explore Collection <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-rose-100 rounded-full blur-3xl opacity-30" />
            <img
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
              alt="Premium Sneakers Collection"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-rose-50 opacity-50" />
    </div>
  );
}

export default Hero;
