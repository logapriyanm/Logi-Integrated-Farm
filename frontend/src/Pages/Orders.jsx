import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const { backendUrl, token, currency } = useCart();

    const [orderData, setOrderData] = useState([]);

const loadOrderData = async () => {
  try {
    if (!token) return;

    const response = await axios.post(
      `${backendUrl}/api/orders/userorders`,
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      let allOrdersItem = [];

      response.data.orders.forEach((order) => {
        order.items.forEach((item) => {
          item.status = order.status;
          item.payment = order.payment;
          item.paymentMethod = order.paymentMethod;
          item.date = order.date;
          allOrdersItem.push(item);
        });
      });

      setOrderData(allOrdersItem.reverse());
    }
  } catch (error) {
    console.log("Failed to load orders:", error);
  }
};



    useEffect(() => {
        loadOrderData()
}, [token])

    return (
        <div className="border-t my-10 md:p-16 p-6">
            <div className="text-2xl mb-6">
                <h1 className="text-xl font-medium">My Orders</h1>
            </div>

            <div className="space-y-4">
                {orderData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="py-4 border-t  text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >
                            <div className="flex items-start gap-6 text-sm">
                                <img
                                    className="w-30 sm:w-30 rounded-lg"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                   <div className="flex mt-1 gap-5">
                                     <p className="text-green-600 font-bold">
                                        {currency}{item.price}
                                    </p>
                                    <p>Quantity: {item.quantity}</p>
                                   </div>
                                    <p className="text-gray-800 text-sm mt-2">Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span></p>
                                    <p className="text-gray-800 text-sm">Payment: <span className="text-gray-500">{item.paymentMethod}</span></p>
                                </div>
                            </div>
                            <div className="flex md:w-1/2 justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm md:text-base">{item.status}</p>
                                </div>

                                <button onClick={loadOrderData} className="border px-4 cursor-pointer hover:bg-green-600 hover:border-green-600 py-2 text-sm font-medium rounded-sm">Track Order</button>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;
