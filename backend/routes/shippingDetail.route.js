import { Router } from "express";
import { createShippingDetails, getShippingDetailsByOrderId, updateShippingDetails } from "../controllers/shippingDetail.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();


router.post("/create", authMiddleware, createShippingDetails);
router.get("/:order_id", authMiddleware, getShippingDetailsByOrderId);
router.put("/update/:order_id", authMiddleware, updateShippingDetails);

export default router;
