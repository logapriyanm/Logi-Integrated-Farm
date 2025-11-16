import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;
    const file = req.file;

    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ message: "Name, category, and price are required." });
    }
    if (!file) {
      return res.status(400).json({ message: "Please upload an image." });
    }
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
      folder: "integrated-farm/products",
    });

    const normalizedCategory = category
      .trim()
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    // Save product to MongoDB
    const productData = new ProductModel({
      name,
      category: normalizedCategory,
      price,
      stock,
      description,
      image: result.secure_url,
      date: Date.now(),
    });

    await productData.save();
    res.status(201).json({
      success: true,
      message: " Product added successfully",
    });
  } catch (error) {
    console.error(" Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error(" Error fetching single product:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, category, price, stock, description } = req.body;
    const file = req.file; // optional new image

    // Find the existing product
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // If a new image is uploaded, replace it on Cloudinary
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
        folder: "integrated-farm/products",
      });
      product.image = result.secure_url;
    }

    // Update other fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (description) product.description = description;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  updateProduct,
  removeProduct,
  singleProduct,
};
