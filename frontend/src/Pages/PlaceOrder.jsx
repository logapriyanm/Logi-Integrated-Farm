
import { useCart } from "../context/CartContext";
import StripeLogo from "../assets/stripe_logo.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cart, currency, delivery_fee, navigate, backendUrl, token, addToCart, removeFromCart, products } = useCart();


  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    postal: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

       // 🧩 Check stock before placing order
    for (const item of cart) {
      const product = products.find((p) => p._id === item._id);
      if (product && item.quantity > product.stock) {
        toast.error(`Only ${product.stock} units of ${product.name} available`);
        return; // ❌ Stop order placement
      }
    }
    
      // Build order items
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image:item.image
      }));


      const orderData = {
        items: orderItems,
        amount: totalPrice + delivery_fee,
        address: { ...formData },
        paymentMethod: method,
        date: Date.now(),
      };




      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + "/api/orders/place", orderData, { headers: { token } })
          if (response.data.success) {
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

          case 'stripe':
           const responseStripe = await axios.post(backendUrl + '/api/orders/stripe',orderData,{headers:{token}})
           if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
           }else{
            toast.error(responseStripe.data.message)
           }

          break

        default:

          break;
      }




    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };


  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col p-20 mt-10 sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Delivery Information</h1>
        <input onChange={onChangeHandler} type="text" name="fullName" value={formData.fullName} placeholder="Full Name" className="w-full border border-gray-300 rounded px-4 py-2" required />
        <input onChange={onChangeHandler} name="email" value={formData.email} type="text" placeholder="Email address" className="w-full border border-gray-300 rounded px-4 py-2" required />
        <input onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder="Street" className="w-full border border-gray-300 rounded px-4 py-2" required />
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder="City" className="w-full border border-gray-300 rounded px-4 py-2" required />
          <input onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder="State" className="w-full border border-gray-300 rounded px-4 py-2" required />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name="phone" value={formData.phone} type="number" placeholder="Phone number" className="w-full border border-gray-300 rounded px-4 py-2" required />
          <input onChange={onChangeHandler} name="postal" value={formData.postal} type="number" placeholder="Postal Code" className="w-full border border-gray-300 rounded px-4 py-2" required />
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="mt-8 sm:mt-0 min-w-80 p-6">
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

        <div className="mt-12">
          <h1 className="text-lg  font-medium mb-2">Payment Method</h1>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={StripeLogo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">Cash on Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 hover:bg-green-500 cursor-pointer">Place order</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
