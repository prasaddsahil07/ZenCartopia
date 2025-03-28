import { Router } from "express";
import { 
  createOrderAfterPayment, 
  getMyOrders, 
  getOrderDetails, 
  updateOrderStatus, 
  deleteOrder 
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createOrderAfterPayment);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:order_id", authMiddleware, getOrderDetails);
router.put("/update/:order_id", authMiddleware, updateOrderStatus);
router.delete("/delete/:order_id", authMiddleware, deleteOrder);

export default router;
