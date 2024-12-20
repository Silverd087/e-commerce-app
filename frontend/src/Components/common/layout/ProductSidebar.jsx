import { useState, useEffect } from "react";

export default function ProductSidebar({
  onFilterChange,
  categories,
  brands,
  priceRange,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange); // Local state for price range

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (e) => {
    const newPriceRange = [...localPriceRange];
    newPriceRange[e.target.dataset.index] = Number(e.target.value); // Update the correct index
    setLocalPriceRange(newPriceRange);
  };

  // Update filters whenever any selection changes
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: localPriceRange, // Use the local price range
    });
  }, [selectedCategories, selectedBrands, localPriceRange]);

  return (
    <aside className="mt-28 p-4 pt-28 bg-white border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="checkbox checkbox-primary"
            />
            <label htmlFor={`category-${category}`} className="ml-2">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Brands</h3>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`brand-${brand}`}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="checkbox checkbox-primary"
            />
            <label htmlFor={`brand-${brand}`} className="ml-2">
              {brand}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={localPriceRange[0]}
          onChange={handlePriceChange}
          data-index="0"
          className="range range-primary mb-2"
        />
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={localPriceRange[1]}
          onChange={handlePriceChange}
          data-index="1"
          className="range range-primary mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>€{localPriceRange[0]}</span>
          <span>€{localPriceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
}
