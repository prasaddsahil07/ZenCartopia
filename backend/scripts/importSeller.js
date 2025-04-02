import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Seller from "../models/seller.model.js";
import sequelize from "../db/dbConnect.js";

const insertSellers = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const sellers = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_sellers_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (sellers.length < 1000) {
          const sellerData = {
            seller_id: row.seller_id,
            seller_name: row.seller_name || "Unknown Seller",
            seller_zip_code_prefix: parseInt(row.seller_zip_code_prefix) || 0,
            seller_city: row.seller_city || "Unknown City",
            seller_state: row.seller_state || "XX",
          };

          sellers.push(sellerData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${sellers.length} sellers, inserting into DB...`);

        await Seller.bulkCreate(sellers, { ignoreDuplicates: true });

        console.log("✅1000 Sellers Successfully Inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting sellers:", error);
    process.exit(1);
  }
};

insertSellers();
