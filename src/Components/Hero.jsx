import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

const Hero = () => {
  const HERO_SLIDES = [
    {
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      title: "New Collection",
      subtitle: "Spring 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
      title: "Limited Edition",
      subtitle: "Exclusive Drops",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === HERO_SLIDES.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [HERO_SLIDES.length]);
  return (
    <div className="relative bg-gray-800 text-white h-[70vh]">
      <img
        src={HERO_SLIDES[currentSlide].image}
        alt={HERO_SLIDES[currentSlide].title}
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Step into Greatness</h1>
          <p className="text-xl mb-8">
            Discover our {HERO_SLIDES[currentSlide].subtitle}
          </p>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold flex items-center hover:bg-gray-200 transition duration-300">
            Shop Now
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};
export default Hero;
