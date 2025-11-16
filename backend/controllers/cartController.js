import UserModel from "../models/userModel.js";

// Add single item to cart
const addToCart = async (req, res) => {
  try {
    
    const { userId, itemId, quantity = 1 } = req.body;

    const user = await UserModel.findById(userId);
    let cartData = await user.cartData || {};

    // Add or increase quantity
    cartData[itemId] = (cartData[itemId] || 0) + quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "Item added to cart", cartData });
   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;

    const user = await UserModel.findById(userId);
    let cartData = user.cartData || {};

    if (quantity <= 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get logged-in user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    let cartData = user.cartData || {};

    res.json({ success: true, cartData });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update full cart (if needed)
const updateAllCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartData } = req.body; // full cart object: {itemId: quantity}

    await UserModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "Cart synced", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, updateAllCart };
