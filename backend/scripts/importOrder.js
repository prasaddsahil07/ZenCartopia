import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Order from "../models/order.model.js";
import sequelize from "../db/dbConnect.js";

const insertOrders = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const orders = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_orders_dataset.csv");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (orders.length < 1000) {
          const orderData = {
            order_id: row.order_id,
            customer_unique_id: row.customer_id,
            order_status: row.order_status || "pending", // Default to pending if empty
          };
          orders.push(orderData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${orders.length} orders, inserting into DB...`);

        await Order.bulkCreate(orders, { ignoreDuplicates: true });

        console.log("✅ 1000 orders successfully inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting orders:", error);
    process.exit(1);
  }
};

insertOrders();
