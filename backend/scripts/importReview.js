import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Review from "../models/review.model.js";
import sequelize from "../db/dbConnect.js";

const insertReviews = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const reviews = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_order_reviews_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (reviews.length < 1000) {
          const reviewData = {
            review_id: row.review_id,
            order_id: row.order_id,
            review_score: row.review_score || 5, // Default score 5 if missing
            review_comment_title: row.review_comment_title || null,
            review_comment_message: row.review_comment_message || null,
          };
          reviews.push(reviewData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${reviews.length} reviews, inserting into DB...`);
        await Review.bulkCreate(reviews, { ignoreDuplicates: true });
        console.log("✅ 1000 reviews successfully inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting reviews:", error);
    process.exit(1);
  }
};

insertReviews();
