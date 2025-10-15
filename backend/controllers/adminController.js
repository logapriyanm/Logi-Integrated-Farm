import orderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";

// ===============================
// 📊 1. Dashboard Statistics - FIXED VERSION
// ===============================
export const getAdminStats = async (req, res) => {
  try {
    const orders = await orderModel.find();
    const products = await ProductModel.find();

    const totalOrders = orders.length;
    
    // FIX: Include COD orders where payment is false but status is delivered
    // Also include online orders where payment is true
    const codOrders = orders.filter(o => 
      o.paymentMethod === "COD" && 
      (o.payment === true || o.status === "Delivered")
    );
    
    const onlineOrders = orders.filter(o => 
      o.paymentMethod !== "COD" && 
      o.payment === true
    );

    console.log("COD Orders count:", codOrders.length);
    console.log("Online Orders count:", onlineOrders.length);
    console.log("Total Orders:", totalOrders);

    const codEarnings = codOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const onlineEarnings = onlineOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalRevenue = codEarnings + onlineEarnings;

    const profit = totalRevenue * 0.6; // Example: 60% profit margin

    // Count by order status
    const ordersByStatus = {
      "Order Placed": orders.filter(o => o.status === "Order Placed").length,
      "Packing": orders.filter(o => o.status === "Packing").length,
      "Shipped": orders.filter(o => o.status === "Shipped").length,
      "Out for delivery": orders.filter(o => o.status === "Out for delivery").length,
      "Delivered": orders.filter(o => o.status === "Delivered").length,
      "Canceled": orders.filter(o => o.status === "Canceled").length,
      "Returned": orders.filter(o => o.status === "Returned").length,
    };

    res.json({
      codEarnings,
      onlineEarnings,
      totalRevenue,
      profit,
      totalOrders,
      ordersByStatus,
    });
  } catch (error) {
    console.error("Error in getAdminStats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// ===============================
// 🛒 2. Products (with stock info)
// ===============================
export const getAdminProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    const orders = await orderModel.find();

    const productSales = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productName = item.name?.trim().toLowerCase();
        if (productName) {
          productSales[productName] =
            (productSales[productName] || 0) + (item.quantity || 0);
        }
      });
    });

    const productsWithSales = products.map((p) => ({
      _id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      unitsSold: productSales[p.name.trim().toLowerCase()] || 0,
    }));

    res.json(productsWithSales);
  } catch (error) {
    console.error("Error in getAdminProducts:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


// ===============================
// 📈 3. Monthly Sales Data
// ===============================
export const getSalesData = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: "Delivered" });
    const monthlySales = {};

    orders.forEach((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", { month: "short" });

      monthlySales[month] = (monthlySales[month] || 0) + order.amount;
    });

    // Sort months in correct order
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesData = monthOrder.map((m) => ({
      month: m,
      sales: monthlySales[m] || 0,
    }));

    res.json(salesData);
  } catch (error) {
    console.error("Error in getSalesData:", error);
    res.status(500).json({ message: "Failed to fetch sales data" });
  }
};
