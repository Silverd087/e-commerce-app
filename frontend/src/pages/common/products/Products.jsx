import { useState, useEffect, useMemo } from "react";
import { Menu } from "lucide-react";
import CardItem from "../../../Components/common/products/CardItem";
import Pagination from "../../../Components/common/layout/Pagination";
import SearchBar from "../../../Components/common/products/SearchBar";
import ProductSidebar from "../../../Components/common/layout/ProductSidebar";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sbabeetbackend.onrender.com/api/products"
        );
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Expected an array but received:", response.data);
        }

        const uniqueCategories = [
          ...new Set(response.data.products.map((product) => product.category)),
        ];
        const uniqueBrands = [
          ...new Set(response.data.products.map((product) => product.brand)),
        ];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    const filtered = memoizedProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, memoizedProducts]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100  md:relative md:translate-x-0 z-10`}
        style={{ width: "250px" }}
      >
        <ProductSidebar
          onFilterChange={setFilters}
          categories={categories}
          brands={brands}
          priceRange={filters.priceRange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-20 p-6 md:p-8">
        {/* Search and Menu */}
        <div className="mb-6 flex items-center space-x-4">
          <SearchBar
            onSearch={setSearchQuery}
            className="flex-1 border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Products */}
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
