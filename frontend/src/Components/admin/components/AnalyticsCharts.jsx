import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function AnalyticsCharts({ orders, users }) {
  const [incomeData, setIncomeData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Process income data
    const incomePerDay = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.totalPrice;
      return acc;
    }, {});

    const incomeChartData = Object.entries(incomePerDay).map(
      ([date, total]) => ({
        date,
        total,
      })
    );

    setIncomeData(incomeChartData);

    // Process user registration data
    const usersPerDay = users.reduce((acc, user) => {
      const date = new Date(user.createdAt).toLocaleDateString(); // Assuming users have a createdAt field
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const userChartData = Object.entries(usersPerDay).map(([date, count]) => ({
      date,
      count,
    }));

    setUserData(userChartData);
  }, [orders, users]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Income per Day Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Income Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#4169E1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Joining Per Day Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Users Joining Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#FF6347" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
