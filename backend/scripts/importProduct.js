import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Product from "../models/product.model.js";
import sequelize from "../db/dbConnect.js";

const insertProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const products = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_products_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (products.length < 1000) {
          const productData = {
            product_id: row.product_id,
            product_category_name_english: row.product_category_name || null,
            product_name: row.product_name || "ProductXYZ",
            product_description: row.product_description || "ProductABC",
            product_price: parseFloat(row.product_price) || 100,
            product_photos: row.product_photos || "default.jpg",
          };

          products.push(productData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${products.length} products, inserting into DB...`);
        
        await Product.bulkCreate(products, { ignoreDuplicates: true });
        console.log("✅1000 Products successfully inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting products:", error);
    process.exit(1);
  }
};

insertProducts();
