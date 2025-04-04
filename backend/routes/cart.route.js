import { Router } from "express";
import { addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        getCustomerCart
 } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/add", authMiddleware, addItemToCart);
router.put("/update", authMiddleware, updateCartItemQuantity);
router.delete("/remove/:id", authMiddleware, removeItemFromCart);
router.get("/myCart", authMiddleware, getCustomerCart);

export default router;