import { Router } from "express";
import { checkoutPayment, getPaymentsByOrderId } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/checkout", authMiddleware, checkoutPayment);
router.get("/order/:order_id", authMiddleware, getPaymentsByOrderId);

export default router;
