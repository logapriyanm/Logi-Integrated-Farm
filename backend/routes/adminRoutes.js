import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getAdminStats, getAdminProducts, getSalesData } from "../controllers/adminController.js";

const router = express.Router();

// Admin dashboard routes
router.get("/stats", adminAuth, getAdminStats);
router.get("/products", adminAuth, getAdminProducts);
router.get("/sales-data", adminAuth, getSalesData);

export default router;
