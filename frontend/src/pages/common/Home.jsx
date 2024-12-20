import AboutUs from "../../Components/common/section/AboutUs";
import FeaturedProducts from "../../Components/common/section/FeaturedProducts";
import ContactUs from "../../Components/common/section/ContactUs";
import Carousel from "../../Components/common/section/Carousel";
import Categories from "../../Components/common/section/Categories";
import { useState, useEffect } from "react";
import Hero from "../../Components/common/section/Hero"
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <div className="h-full bg-[#EFF3F6]">
      <Hero />
      <Carousel products={products} />
      <AboutUs />
      <Categories />
      <FeaturedProducts products={products} />
      <ContactUs />
    </div>
  );
}
