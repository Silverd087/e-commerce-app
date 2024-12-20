import React from "react";
import CardItem from "../products/CardItem";

export default function FeaturedProducts({ products }) {
  const topRatedShoes = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className=" flex justify-around items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topRatedShoes.map((product, index) => (
            <CardItem key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
