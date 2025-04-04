import { Router } from "express";
import { 
  createOrder, 
  getMyOrders, 
  getOrderDetails, 
  updateOrderStatus, 
  deleteOrder 
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:order_id", authMiddleware, getOrderDetails);
router.put("/update/:id", authMiddleware, updateOrderStatus);
router.delete("/delete/:id", authMiddleware, deleteOrder);

export default router;
