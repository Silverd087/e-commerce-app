export const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `This is a description for Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 1,
  category: ["Electronics", "Clothing", "Books", "Home & Garden"][
    Math.floor(Math.random() * 4)
  ],
  brand: ["Apple", "Samsung", "Sony", "LG", "Nike", "Adidas"][
    Math.floor(Math.random() * 6)
  ],
  image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`,
}));

export const categories = ["Electronics", "Clothing", "Books", "Home & Garden"];
export const brands = ["Apple", "Samsung", "Sony", "LG", "Nike", "Adidas"];
