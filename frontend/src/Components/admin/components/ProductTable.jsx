import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Trash } from "lucide-react";
import AddProductModal from "./AddModalProduct";
import { jwtDecode } from "jwt-decode";

const ITEMS_PER_PAGE = 10;
const FILTER_OPTIONS = [
  { value: "price", label: "Price" },
  { value: "stock", label: "Stock" },
  { value: "sold", label: "Sold" },
];

export default function ProductTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("price");
  const [filterOrder, setFilterOrder] = useState("asc");
  const [productList, setProductList] = useState([]);
  const url = "http://localhost:5001/api/products";
  const [userId, setUserId] = useState();

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (userId) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(`${url}/${productId}`, { headers })
        .then((response) => {
          alert(response.data.msg);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setProductList(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return productList
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const multiplier = filterOrder === "asc" ? 1 : -1;
        return (a[filterBy] - b[filterBy]) * multiplier;
      });
  }, [searchQuery, filterBy, filterOrder, productList]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <button
              className="btn btn-square btn-ghost"
              onClick={() =>
                setFilterOrder(filterOrder === "asc" ? "desc" : "asc")
              }
            >
              {filterOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="mb-4">
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </button>
          </div>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </td>
                    <td className="font-medium">{product.name}</td>
                    <td>{product.brand}</td>
                    <td>€{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.sold}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-ghost"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-base-content/60">
                      <p className="font-medium">No products found</p>
                      {searchQuery && (
                        <p className="text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {paginatedProducts.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button className="join-item btn">
                Page {currentPage} of {totalPages}
              </button>
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
      <AddProductModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
