import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const RelatedProducts = ({ currentCategory, currentId }) => {
  const { products, addToCart, currency, token, navigate } = useCart();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (currentCategory && currentId) {
      const filtered = products
        .filter(
          item =>
            item.category?.trim().toLowerCase() === currentCategory?.trim().toLowerCase() &&
            item._id !== currentId
        )
        .slice(0, 4);

      setRelated(filtered);
    }
  }, [currentCategory, currentId, products]);

  // 🆕 Handle add to cart with login check
  const handleAddToCart = (item) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Related {currentCategory}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => {
          const unit = item.category === "Farm Produce" ? "kg" : "pcs";
          return (
            <div
              key={item._id}
              className="border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <Link to={`/products/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
              </Link>
              <p className="text-green-600 font-bold mt-1">
                {currency}{item.price} / {unit}
              </p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;