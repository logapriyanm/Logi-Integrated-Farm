import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RiShoppingBasketFill } from "react-icons/ri";
import { backendUrl, currency } from "../App";
import { IoIosArrowDropdown } from "react-icons/io";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState(""); // Optional month filter

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        setFilteredOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter orders by status and month
  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by month
    if (monthFilter) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.date).getMonth() + 1 === parseInt(monthFilter)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, monthFilter]);

  // Update status
  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;

    try {
      const updateData = { orderId, status: newStatus };

      const response = await axios.post(
        `${backendUrl}/api/orders/status`,
        updateData,
        { headers: { token } }
      );

      if (response.data.success) {
        const updatedOrder = response.data.order;

        // Update the order in local state immediately
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, ...updatedOrder } : order
          )
        );

        toast.success("Order status updated!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="mt-10 pb-10 px-1   rounded-md md:px-8 bg-gray-50 min-h-screen">
      <h3 className="text-2xl pt-4 md:text-3xl font-semibold mb-6 text-gray-800">
        Orders
      </h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        {/* Status Filter */}
        <div className="relative w-48">
          <select
            className="w-full border px-3 py-2 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Pending</option>
            <option value="Packing">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
            <option value="Returned">Returned</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <IoIosArrowDropdown className="text-gray-500" />
          </div>
        </div>

        {/* Month Filter */}
        <div className="relative w-48">
          <select
            className="w-full border px-3 py-2 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <IoIosArrowDropdown className="text-gray-500" />
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 mb-3 gap-2">
                <div className="flex items-center gap-2 text-green-600">
                  <RiShoppingBasketFill size={22} />
                  <h4 className="font-semibold text-gray-800">
                    Order #{index + 1}
                  </h4>
                </div>

                <div
                  className={`px-3 py-1 rounded-lg text-xs font-medium w-fit ${
                    order.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment ? "Paid" : "Pending"}
                </div>
              </div>

              {/* Order Info */}
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                {/* Items with Images */}
                <div>
                  <h5 className="font-semibold mb-3 text-gray-700">Items</h5>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex  items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder-image.jpg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md border"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">
                            {item.name}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-600 text-xs">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-green-600 font-semibold text-xs">
                              {currency}{item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h5 className="font-semibold mb-2 text-gray-700">
                    Shipping Address
                  </h5>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600 font-medium">
                      {order.address.fullName}
                    </p>
                    <p className="text-gray-600 text-sm">{order.address.street}</p>
                    <p className="text-gray-600 text-sm">
                      {order.address.city} - {order.address.postal},{" "}
                      {order.address.state}
                    </p>
                    <p className="text-gray-600 text-sm">{order.address.phone}</p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h5 className="font-semibold mb-2 text-gray-700">
                    Order Summary
                  </h5>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <p className="text-gray-600 flex justify-between">
                      <span className="font-medium">Items:</span> 
                      <span>{order.items.length}</span>
                    </p>
                    <p className="text-gray-600 flex justify-between">
                      <span className="font-medium">Method:</span> 
                      <span>{order.paymentMethod}</span>
                    </p>
                    <p className="text-gray-600 flex justify-between">
                      <span className="font-medium">Date:</span> 
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    <div className="border-t pt-2 mt-2">
                      <p className="font-semibold text-gray-800 flex justify-between">
                        <span>Total:</span> 
                        <span>{currency}{order.amount}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 mt-4 border-t">
                <div className="flex items-center gap-2">
                  <h1 className="md:hidden text-base text-green-600 font-medium">
                    Order Status:
                  </h1>
                </div>
                <div className="relative">
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status || "Order Placed"}
                    className="w-48  border px-3 py-2 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Returned">Returned</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDropdown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;