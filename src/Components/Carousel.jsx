import { useState, useEffect } from "react";

export default function Carousel() {
  const featuredProducts = [
    {
      id: 1,
      name: "Nike Air Zoom",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 4,
      name: "Reebok Classic",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "New Balance 574",
      price: 109.99,
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === featuredProducts.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [featuredProducts.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  const getSlideClasses = (index) => {
    return index === currentSlide
      ? "opacity-100 transition-opacity duration-700 ease-in-out"
      : "opacity-0 hidden";
  };

  return (
    <div className="bg-gray-800 relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-screen h-screen flex items-center justify-center">
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            className={`flex justify-between items-center w-screen h-full absolute ${getSlideClasses(
              index
            )}`}
          >
            {/* Left side: Shoe image */}
            <div className="w-1/2 h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right side: Runner image and text */}
            <div className="w-1/2 h-full relative flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1597892657493-6847b9640bac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Runner"
                className="absolute w-full h-full object-cover opacity-50 rounded-lg"
              />
              <div className="absolute w-96 h-52 z-10 text-center p-8 bg-black bg-opacity-50 rounded-lg">
                <p className="text-4xl font-bold text-white">{product.name}</p>
                <p className="text-2xl font-semibold text-white">
                  ${product.price.toFixed(2)}
                </p>
                <button className="mt-4 btn btn-primary">Shop Now</button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-30">
          <button
            onClick={handlePrevSlide}
            className="bg-black text-white p-2 rounded-full"
          >
            ❮
          </button>
          <button
            onClick={handleNextSlide}
            className="bg-black text-white p-2 rounded-full"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
