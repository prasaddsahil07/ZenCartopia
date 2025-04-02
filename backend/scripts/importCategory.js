import fs from "fs";
import path from "path";
import csv from "csv-parser";
import ProductCategory from "../models/product_category_name_translation.model.js";
import sequelize from "../db/dbConnect.js";

const insertCategories = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const categories = [];
    const filePath = path.join(process.cwd(), "backend", "public", "product_category_name_translation.csv");

    // Fix: Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (categories.length < 1000) {
          // Ensure required fields are not null
          const categoryData = {
            product_category_name_english: row.product_category_name_english || "unknown",
          };
          categories.push(categoryData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${categories.length} categories, inserting into DB...`);

        await ProductCategory.bulkCreate(categories, { ignoreDuplicates: true });

        console.log("✅ 1000 categories Successfully Inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting categories:", error);
    process.exit(1);
  }
};

insertCategories();
