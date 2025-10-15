import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.single("image"), addProduct);
productRouter.get('/list', listProducts);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/update', adminAuth, upload.single("image"), updateProduct);

export default productRouter;
