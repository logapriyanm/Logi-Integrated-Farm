
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
const [token, setToken] = useState(localStorage.getItem("token") || "");
const [tokenExpiry, setTokenExpiry] = useState(
  localStorage.getItem("tokenExpiry")
);

  const navigate = useNavigate();

  useEffect(() => {
  if (!token || !tokenExpiry) return;

  const remainingTime = Number(tokenExpiry) - Date.now();

  if (remainingTime <= 0) {
    logout();
    navigate("/login");
    return;
  }

  const timer = setTimeout(() => {
    toast.info("Session expired. Please login again.");
    logout();
    navigate("/login");
  }, remainingTime);

  return () => clearTimeout(timer);
}, [token, tokenExpiry]);


  // ---------------- Fetch all products ----------------
  const getProductsData = async () => {
    if (!backendUrl) {
      toast.error("Missing backend URL");
      return;
    }
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
      else toast.error(res.data.message);
    } catch (error) {
      toast.error("Error loading products: " + error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Create product map for fast lookup
  const productMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p._id, p])),
    [products]
  );

  // ---------------- Fetch user cart from DB ----------------
  const fetchUserCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { token },
      });

      if (res.data.success && products.length > 0) {
        const cartData = res.data.cartData || {};
        const updatedCart = Object.keys(cartData)
          .map((id) => {
            const product = productMap[id];
            return product ? { ...product, quantity: cartData[id] } : null;
          })
          .filter(Boolean);
        setCart(updatedCart);
      }
    } catch (error) {
      toast.error("Failed to fetch user cart");
    }
  };

  useEffect(() => {
    if (token && products.length > 0) {
      fetchUserCart();
    }
  }, [token, products]);

  // ---------------- Persist guest cart ----------------
  useEffect(() => {
    const storedCart = localStorage.getItem("guestCart");
    if (storedCart && !token) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("guestCart");
    }
  }, [cart, token]);

  // ---------------- Merge guest cart after login ----------------
  const mergeGuestCartToDB = async () => {
    if (!token) return;
    const storedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    if (storedCart.length === 0) return;

    const cartData = {};
    storedCart.forEach((item) => {
      cartData[item._id] = item.quantity;
    });

    try {
      await axios.post(
        `${backendUrl}/api/cart/updateAll`,
        { cartData },
        { headers: { token } }
      );
      localStorage.removeItem("guestCart");
      fetchUserCart();
    } catch (err) {
      toast.error("Failed to merge guest cart");
    }
  };

  useEffect(() => {
    if (token) mergeGuestCartToDB();
  }, [token]);

// In your CartContext.jsx - update the addToCart function
const addToCart = async (product, quantity = 1) => {
  // Check if user is logged in
  if (!token) {
    toast.error("Please login to add items to cart");
    navigate("/login");
    return;
  }

  setCart((prevCart) => {
    const existing = prevCart.find((item) => item._id === product._id);
    const currentQty = existing ? existing.quantity : 0;
    const newQty = currentQty + quantity;

    if (newQty > product.stock) {
      toast.error(`Only ${product.stock} units of ${product.name} available`);
      return prevCart; // do not update cart
    }

    const updatedCart = existing
      ? prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: newQty } : item
        )
      : [...prevCart, { ...product, quantity }];

    // Sync to DB if logged in
    if (token) {
      axios
        .post(
          `${backendUrl}/api/cart/update`,
          { itemId: product._id, quantity: newQty },
          { headers: { token } }
        )
        .then(() => {
          fetchUserCart();
        })
        .catch(() => toast.error("Failed to update cart"));
    }

    return updatedCart;
  });
};


  // ---------------- Remove from cart ----------------
  const removeFromCart = async (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId: _id, quantity: 0 },
          { headers: { token } }
        );
        toast.success("Item removed from cart");

      } catch (error) {
        toast.error("Failed to remove item");
      }
    }
  };

  // ---------------- Quantity controls ----------------
  const increaseQty = async (id) => {
    const item = cart.find((c) => c._id === id);
    if (!item) return;

    if (item.quantity + 1 > item.stock) {
      toast.error(`Only ${item.stock} units of ${item.name} available`);
      return;
    }

    await addToCart(item, 1);
  };


  const decreaseQty = async (id) => {
    const item = cart.find((c) => c._id === id);
    if (!item) return;

    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((c) => (c._id === id ? { ...c, quantity: newQty } : c))
    );

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId: id, quantity: newQty },
          { headers: { token } }
        );
      } catch {
        toast.error("Failed to update quantity");
      }
    }
  };

  useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return () => axios.interceptors.response.eject(interceptor);
}, []);


  // ---------------- Logout helper ----------------
const logout = () => {
  setToken("");
  setTokenExpiry(null);
  setCart([]);
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("guestCart");
};

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        currency,
        delivery_fee,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        navigate,
        backendUrl,
        token,
        setToken,
        fetchUserCart,
        mergeGuestCartToDB,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

