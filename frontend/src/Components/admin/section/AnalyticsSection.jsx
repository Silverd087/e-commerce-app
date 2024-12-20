import { useState, useEffect } from "react";
import AnalyticsCards from "../components/AnalyticsCards";
import AnalyticsCharts from "../components/AnalyticsCharts";
import axios from "axios";

export default function AnalyticsSection() {
  const userUrl = "http://localhost:5001/api/users";
  const orderUrl = "http://localhost:5001/api/orders";
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(userUrl)
      .then((response) => {
        setUsers(response.data.users); // Corrected to use parentheses
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(orderUrl)
      .then((response) => {
        setOrders(response.data.orders); // Corrected to use parentheses
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section id="analytics" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <AnalyticsCards orders={orders} users={users} />
      <AnalyticsCharts orders={orders} users={users} />
    </section>
  );
}
