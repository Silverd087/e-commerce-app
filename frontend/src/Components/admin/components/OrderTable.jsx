import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import OrderDetails from "./OrderDetails";
import axios from "axios";

const DELIVERY_STATUS = {
  PENDING: "pending",
  IN_DELIVERY: "being delivered",
  DELIVERED: "delivered",
};

const ITEMS_PER_PAGE = 10;

export default function OrderTable() {
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const url = "https://sbabeetbackend.onrender.com/api/orders";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((_id) => _id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case DELIVERY_STATUS.DELIVERED:
        return "badge-success";
      case DELIVERY_STATUS.IN_DELIVERY:
        return "badge-warning";
      case DELIVERY_STATUS.PENDING:
      default:
        return "badge-neutral";
    }
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body">
        <h2 className="card-title">Orders</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivery Status</th>
                <th className="w-[50px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length ? (
                paginatedOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="hover cursor-pointer"
                      onClick={() => toggleOrderExpansion(order._id)}
                    >
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.orderDate.split("T")[0]}</td>
                      <td>€{order.totalPrice}</td>
                      <td>
                        <div
                          className={`badge ${getStatusBadgeColor(
                            order.status
                          )}`}
                        >
                          {order.status || DELIVERY_STATUS.PENDING}
                        </div>
                      </td>
                      <td>
                        {expandedOrders.includes(order._id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </tr>
                    {expandedOrders.includes(order._id) && (
                      <tr key={`${order._id}-details`}>
                        <td colSpan={6} className="p-0">
                          <OrderDetails items={order.items} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-base-content/60">
                      <p className="font-medium">No orders found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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
      </div>
    </div>
  );
}
