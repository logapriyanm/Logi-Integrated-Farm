import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const categories = ["All Products", "Farm Produce", "Pets & Livestock"];

export default function ProductsPage() {
  const navigateContact = useNavigate();
  const { products, addToCart, token, navigate } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [quantities, setQuantities] = useState({});

  const contact = () => {
    navigateContact("/contact");
  }
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleQuantityChange = (productId, change, maxStock) => {
    setQuantities((prev) => {
      const newQty = (prev[productId] || 1) + change;
      if (newQty < 1) return { ...prev, [productId]: 1 };
      if (newQty > maxStock) {
        toast.error(`Only ${maxStock} Products available`);
        return { ...prev, [productId]: maxStock };
      }
      return { ...prev, [productId]: newQty };
    });
  };

  // 🆕 Handle add to cart with login check
  const handleAddToCart = (product, quantity) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units of ${product.name} available`);
      return;
    }
    
    addToCart({ ...product, quantity });
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-12">
      {/* Header */}
      <div className="bg-green-600 text-white py-20 text-center">
        <h1 className="text-2xl md:text-5xl font-bold">Our Farm Products</h1>
        <p className="mt-3 text-lg">Fresh. Healthy. Trusted.</p>
      </div>

      {/* Category Filters */}
      <div className="md:flex-row flex flex-col justify-center gap-3 space-x-4 py-15 p-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-green-100 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-12">
        {filteredProducts.map((product) => {
          const quantity = quantities[product._id] || 1;

          return (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.stock < 5
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-center mt-4 gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(product._id, -1, product.stock);
                    }}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    −
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(product._id, +1, product.stock);
                    }}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <div className="mt-4 flex flex-col gap-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product, quantity);
                    }}
                    className="bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Add {quantity} to Cart
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="w-full">
        <section className="bg-green-50 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us for bulk orders, custom requirements, or to schedule a
            farm visit.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={contact} className="px-6 py-3 rounded-lg bg-green-600 cursor-pointer text-white font-semibold shadow hover:bg-green-700 transition">
              Contact Us
            </button>
            <button onClick={contact} className="px-6 py-3 rounded-lg border-2 cursor-pointer border-green-600 text-green-600 font-semibold hover:bg-green-100 transition">
              Book a Visit
            </button>
          </div>
        </section>

        <section className="bg-green-600 py-12 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-4 rounded-full">
              <IoShieldCheckmark size={20} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
          <p className="max-w-2xl mx-auto text-green-100 leading-relaxed">
            All our products are backed by our commitment to sustainable farming
            practices and quality assurance. We guarantee fresh, healthy, and
            trusted products from our integrated farm system.
          </p>
        </section>
      </div>
    </section>
  );
}