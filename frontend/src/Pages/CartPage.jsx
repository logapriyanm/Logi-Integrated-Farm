import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, currency, delivery_fee, navigate } = useCart();

  // Total items & price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Empty Cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="text-green-600 mb-3 rounded-full p-4 w-fit bg-green-200">
          <FaShoppingCart size={30} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md">
          Start shopping for fresh farm products and add them to your cart.
        </p>
        <Link
          to="/products"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 sm:mt-20 p-4 sm:p-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Shopping Cart</h2>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {totalItems} items in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 pb-10 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {cart.map((item) => {
            const unit = item.category === "Farm Produce" ? "kg" : "pcs"; // ✅ unit logic
            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-5 border border-gray-200 bg-white rounded-2xl shadow-sm gap-4"
              >
                {/* Left Side - Product Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                    <p className="text-green-600 font-bold text-base sm:text-lg">
                      {currency}{item.price} / {unit}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Stock: {item.stock} {unit}
                    </p>
                  </div>
                </div>

                {/* Right Side - Qty & Price */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <div className="flex items-center border rounded-full px-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-8 h-8 flex items-center cursor-pointer justify-center text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity} {unit}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 flex items-center cursor-pointer justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-20 text-right font-semibold text-base sm:text-lg">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 h-fit">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Items ({totalItems})</span>
            <span className="font-semibold">{currency}{totalPrice}.00</span>
          </div>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">{currency}{delivery_fee}.00</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between text-base sm:text-lg font-bold mb-4">
            <span>Total</span>
            <span className="text-green-600 font-bold">{currency}{totalPrice + delivery_fee}.00</span>
          </div>

          <button onClick={()=>navigate('/place-order')} className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 sm:py-3 rounded-xl font-semibold mb-3 shadow">
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="block w-full border-2 border-green-600 text-green-600 py-2 sm:py-3 rounded-xl font-semibold text-center hover:bg-green-600 hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
