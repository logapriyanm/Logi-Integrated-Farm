import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
  updateAllCart,
} from "../controllers/cartController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authUser, addToCart);
router.post("/update", authUser, updateCart);
router.get("/get", authUser, getUserCart);
router.post("/updateAll", authUser, updateAllCart);

export default router;
