import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";
import productModel from "../models/productModel.js";

const currency = "inr";
const deliveryCharge = 50;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.user.id;

    for (const item of items) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found: ${item.name}`,
        });
      }
      if (product.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Not enough stock for "${product.name}". Available: ${product.stock}`,
        });
      }
    }
    //  Create order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: Date.now(),
    });
    await newOrder.save();
    //  Reduce stock safely
    for (const item of items) {
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    
    for (const item of items) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found: ${item.name}`,
        });
      }
      if (product.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Not enough stock for "${product.name}". Available: ${product.stock}`,
        });
      }
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const userId = req.user.id;
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status, payment } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update status
    order.status = status;


    if (status === "Delivered") {
      order.payment = true;
    } else if (payment !== undefined) {
      order.payment = payment; 
    }

    await order.save();
    res.json({ success: true, message: "Order updated", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export {
  placeOrder,
  verifyStripe,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
