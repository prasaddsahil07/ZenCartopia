import { Router } from "express";
import { 
  createReview, 
  getReviewsByOrderId, 
  getAllReviews, 
  updateReview, 
  deleteReview 
} from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createReview);
router.get("/order/:order_id", getReviewsByOrderId);
router.get("/all", getAllReviews);
router.put("/update/:review_id", authMiddleware, updateReview);
router.delete("/delete/:review_id", authMiddleware, deleteReview);

export default router;
