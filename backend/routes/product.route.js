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
router.get("/getAllProducts", authMiddleware, getAllProducts);
router.get("/getProductById/:id", authMiddleware, getProductById);
router.get("/searchProducts", authMiddleware, searchProducts);
router.get("/getProductsByCategory/:category", authMiddleware, getProductsByCategory);
router.get("/:id/recommendations", authMiddleware, getRecommendedProducts);

// Admin-only routes (requires both authentication and admin privileges)
router.post("/createProduct", authMiddleware, adminRoute, createProduct);
router.put("/updateProduct/:id", authMiddleware, adminRoute, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, adminRoute, deleteProduct);

export default router;
