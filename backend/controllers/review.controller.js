import Review from "../models/review.model.js";
import { v4 as uuidv4 } from "uuid";

// Create a new review
export const createReview = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { order_id, review_score, review_comment_title, review_comment_message } = req.body;
    
    if (!order_id || !review_score) {
      return res.status(400).json({ message: "order_id and review_score are required" });
    }
    
    // Generate a unique review ID
    const review_id = uuidv4();

    // Create the review
    const review = await Review.create({
      review_id,
      order_id,
      review_score,
      review_comment_title,
      review_comment_message,
    });
    
    return res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    console.error("Error creating review:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews for a given order ID
export const getReviewsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const reviews = await Review.findAll({ where: { order_id } });
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this order" });
    }
    
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all reviews (for admin or analytics)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a review (for example, if a user wants to edit their comment)
export const updateReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const updates = req.body;
    const review = await Review.findByPk(review_id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    await review.update(updates);
    return res.json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const review = await Review.findByPk(review_id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    await review.destroy();
    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
