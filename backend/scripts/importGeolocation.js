import fs from "fs";
import path from "path";
import csv from "csv-parser";
import ShippingDetails from "../models/geolocation.model.js";
import sequelize from "../db/dbConnect.js";

const insertShippingDetails = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const shippingDetails = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_geolocation_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (shippingDetails.length < 1000) {
          const shippingData = {
            order_id: row.order_id,
            geolocation_zip_code_prefix: parseInt(row.geolocation_zip_code_prefix, 10) || null,
            geolocation_address: row.geolocation_address || "NIT Durgapur",
            geolocation_city: row.geolocation_city,
            geolocation_state: row.geolocation_state,
          };
          shippingDetails.push(shippingData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${shippingDetails.length} shipping records, inserting into DB...`);

        await ShippingDetails.bulkCreate(shippingDetails, { ignoreDuplicates: true });

        console.log("✅ 1000 shipping details successfully inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting shipping details:", error);
    process.exit(1);
  }
};

insertShippingDetails();
