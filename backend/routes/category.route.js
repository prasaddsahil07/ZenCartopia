import { Router } from "express";
import ProductCategory from "../models/product_category_name_translation.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const categories = await ProductCategory.findAll({
        attributes: ["product_category_name_english"], 
        group: ["product_category_name_english"]
      });
      
    
        // const uniqueCategories = categories.map(cat => cat.product_category_name_english);
    
        return res.status(200).json(Array.isArray(categories) ? categories : []);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
      }
    
})

export default router;