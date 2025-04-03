import { Router } from "express";
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts, 
  getProductsByCategory, 
  getRecommendedProducts 
} from "../controllers/product.controller.js";
import { authMiddleware, adminRoute } from "../middleware/auth.middleware.js";

const router = Router();

// Public or customer routes
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.get("/searchProducts", searchProducts);
router.get("/getProductsByCategory/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);

// Admin-only routes (requires both authentication and admin privileges)
router.post("/createProduct", authMiddleware, adminRoute, createProduct);
router.put("/updateProduct/:id", authMiddleware, adminRoute, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, adminRoute, deleteProduct);

export default router;
