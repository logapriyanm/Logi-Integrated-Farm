import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------- Fetch Dashboard Data -------------------
  const fetchDashboardData = async () => {
    if (!token) {
      toast.error("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const headers = { token };

      const [statsRes, productsRes, salesRes] = await Promise.all([
        axios.get(`${backendUrl}/api/admin/stats`, { headers }),
        axios.get(`${backendUrl}/api/admin/products`, { headers }),
        axios.get(`${backendUrl}/api/admin/sales-data`, { headers }), // Fixed endpoint name
      ]);

      // Validate responses
      if (statsRes.data) setStats(statsRes.data);
      if (Array.isArray(productsRes.data)) setProducts(productsRes.data);
      if (Array.isArray(salesRes.data)) setSalesData(salesRes.data);

    } catch (error) {
      console.error("Dashboard Error:", error);
      
      if (error.response) {
        // Server responded with error status
        toast.error(`Server Error: ${error.response.data.message || error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error: Could not connect to server");
      } else {
        // Other errors
        toast.error("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Safe data access functions
  const getSafeNumber = (value) => Number(value || 0);
  const getSafeArray = (array) => Array.isArray(array) ? array : [];

  const safeProducts = getSafeArray(products);
  const safeSalesData = getSafeArray(salesData);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <div className="text-center">
          <p className="text-lg mb-4">No data available</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-1 md:px-8 pb-10 my-10 w-full min-h-screen rounded-md bg-gray-50">
      <h1 className="text-2xl font-bold mt-5 text-green-700 mb-4">
        Dashboard Overview
      </h1>

      {/* ------------------- Earnings & Orders Summary ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Cash on Delivery Earnings</p>
          <h2 className="text-2xl font-bold text-green-700">
            {currency}
            {getSafeNumber(stats.codEarnings).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Online Earnings</p>
          <h2 className="text-2xl font-bold text-blue-700">
            {currency}
            {getSafeNumber(stats.onlineEarnings).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold text-orange-600">
            {getSafeNumber(stats.totalOrders)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-600">
          <p className="text-gray-500 text-sm">Profit</p>
          <h2 className="text-2xl font-bold text-purple-700">
            {currency}
            {getSafeNumber(stats.profit).toLocaleString()}
          </h2>
        </div>
      </div>

      {/* ------------------- Orders by Status ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {stats.ordersByStatus && Object.entries(stats.ordersByStatus).map(([status, count]) => (
          <div
            key={status}
            className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500"
          >
            <p className="text-gray-500 text-sm capitalize">
              {status.replace("-", " ")}
            </p>
            <h2 className="text-2xl font-bold">{getSafeNumber(count)}</h2>
          </div>
        ))}
      </div>

      {/* ------------------- Top-Selling Products ------------------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Top-Selling Products
        </h2>
        {safeProducts.length === 0 ? (
          <p className="text-gray-500 text-center">No product data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-full">
              <thead>
                <tr className="border-b text-gray-600 bg-gray-50">
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Units Sold</th>
                  <th className="py-3 px-4 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {safeProducts
                  .sort((a, b) => getSafeNumber(b.unitsSold) - getSafeNumber(a.unitsSold))
                  .slice(0, 10) // Show top 10 only
                  .map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{item.name || "Unknown Product"}</td>
                      <td className="py-3 px-4">{item.category || "Uncategorized"}</td>
                      <td className="py-3 px-4">{getSafeNumber(item.unitsSold)}</td>
                      <td className="py-3 px-4 font-medium">
                        {currency}
                        {(getSafeNumber(item.price) * getSafeNumber(item.unitsSold)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ------------------- Low Stock Alerts ------------------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Low Stock Alerts
        </h2>
        {safeProducts.filter((item) => getSafeNumber(item.stock) < 5).length === 0 ? (
          <p className="text-green-600 font-medium text-center">🎉 All products are well stocked!</p>
        ) : (
          <ul className="space-y-2">
            {safeProducts
              .filter((item) => getSafeNumber(item.stock) < 5)
              .map((item) => (
                <li
                  key={item._id}
                  className="text-red-600 font-semibold p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  ⚠️ {item.name} - Only {getSafeNumber(item.stock)} left in stock!
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* ------------------- Sales Performance Graph ------------------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Sales Performance
        </h2>
        {safeSalesData.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No sales data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={safeSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${currency}${value.toLocaleString()}`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;