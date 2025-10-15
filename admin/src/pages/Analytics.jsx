import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { backendUrl, currency } from "../App"; // Import the same configs as Dashboard
import { toast } from "react-toastify";

const Analytics = ({ token }) => { // Add token prop
  const [dashboardStats, setDashboardStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#16a34a", "#10b981", "#6ee7b7", "#22d3ee", "#2dd4bf"];

  // Fetch all analytics data using Axios
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!token) {
        toast.error("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const headers = { token }; // Add authorization header

        // Fetch all data in parallel using Axios with proper headers and backendUrl
        const [statsResponse, salesResponse, productsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/admin/stats`, { headers }),
          axios.get(`${backendUrl}/api/admin/sales-data`, { headers }),
          axios.get(`${backendUrl}/api/admin/products`, { headers })
        ]);

        console.log("Analytics API Responses:", {
          stats: statsResponse.data,
          sales: salesResponse.data,
          products: productsResponse.data
        });

        // Validate response data
        if (statsResponse.data) {
          setDashboardStats(statsResponse.data);
        }

        if (Array.isArray(salesResponse.data)) {
          setSalesData(salesResponse.data);
        } else {
          console.warn('Sales data is not an array:', salesResponse.data);
          setSalesData([]);
        }

        if (Array.isArray(productsResponse.data)) {
          setProductsData(productsResponse.data);
        } else {
          console.warn('Products data is not an array:', productsResponse.data);
          setProductsData([]);
        }
        
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        
        if (err.response) {
          setError(`Server Error: ${err.response.data.message || err.response.status}`);
          toast.error(`Server Error: ${err.response.data.message || err.response.status}`);
        } else if (err.request) {
          setError("Network error: Could not connect to server");
          toast.error("Network error: Could not connect to server");
        } else {
          setError(err.message || 'Failed to fetch analytics data');
          toast.error("Failed to load analytics data");
        }
        
        // Set default empty arrays on error
        setSalesData([]);
        setProductsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [token]); // Add token as dependency

  // Safe data transformation functions
  const transformRevenueData = (data) => {
    if (!Array.isArray(data)) return [];
    
    return data.map(item => ({
      month: item.month || 'Unknown',
      revenue: item.sales || item.revenue || 0
    }));
  };

  const transformOrdersByStatusData = (stats) => {
    if (!stats || !stats.ordersByStatus) return [];
    
    return Object.entries(stats.ordersByStatus).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count: count || 0
    }));
  };

  const transformCategoryData = (products) => {
    if (!Array.isArray(products)) return [];
    
    return products.reduce((acc, product) => {
      const category = product.category || 'Uncategorized';
      const existingCategory = acc.find(item => item.name === category);
      
      if (existingCategory) {
        existingCategory.value += product.unitsSold || 0;
      } else {
        acc.push({ 
          name: category, 
          value: product.unitsSold || 0 
        });
      }
      
      return acc;
    }, []);
  };

  const transformTopProducts = (products) => {
    if (!Array.isArray(products)) return [];
    
    return products
      .sort((a, b) => (b.unitsSold || 0) - (a.unitsSold || 0))
      .slice(0, 5)
      .map(product => ({
        name: product.name && product.name.length > 15 
          ? product.name.substring(0, 15) + '...' 
          : product.name || 'Unknown Product',
        sales: product.unitsSold || 0
      }));
  };

  const transformPaymentMethodData = (stats) => {
    if (!stats) return [];
    
    return [
      { name: 'COD', value: stats.codEarnings || 0 },
      { name: 'Online', value: stats.onlineEarnings || 0 }
    ];
  };

  // Safe data access helper
  const getSafeNumber = (value) => Number(value || 0);

  // Transform data safely
  const revenueData = transformRevenueData(salesData);
  const ordersByStatusData = transformOrdersByStatusData(dashboardStats);
  const categoryData = transformCategoryData(productsData);
  const topProducts = transformTopProducts(productsData);
  const paymentMethodData = transformPaymentMethodData(dashboardStats);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-lg text-green-700">Loading analytics data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-2">Error loading analytics</div>
          <div className="text-sm text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10  p-1 pt-5 md:p-8 mt-10 w-full rounded-md min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Analytics Dashboard</h1>

      {/* Stats Overview Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-700">
              {currency}
              {(dashboardStats.totalRevenue || 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-green-700">
              {dashboardStats.totalOrders || 0}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Profit</h3>
            <p className="text-2xl font-bold text-green-700">
              {currency}
              {Math.round(dashboardStats.profit || 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
            <p className="text-2xl font-bold text-green-700">
              {dashboardStats.ordersByStatus?.delivered || 0}
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="space-y-8">
        {/* Revenue and Orders Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Revenue Growth Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Monthly Revenue</h2>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${currency}${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No revenue data available
              </div>
            )}
          </div>

          {/* Orders by Status */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Orders by Status</h2>
            {ordersByStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersByStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No orders data available
              </div>
            )}
          </div>
        </div>

        {/* Category and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales by Category */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Sales by Category</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} units`, 'Sales']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No category data available
              </div>
            )}
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Top Selling Products</h2>
            {topProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={topProducts}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value} units`, 'Sales']} />
                  <Bar dataKey="sales" fill="#22c55e" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No products data available
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        {paymentMethodData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Revenue by Payment Method</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${currency}${Number(value).toLocaleString()}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;