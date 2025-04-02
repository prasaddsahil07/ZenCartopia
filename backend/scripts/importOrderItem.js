import fs from "fs";
import path from "path";
import csv from "csv-parser";
import OrderItem from "../models/order_item.model.js";
import sequelize from "../db/dbConnect.js";

const insertOrderItems = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const orderItems = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_order_items_dataset.csv");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (orderItems.length < 1000) {
          const orderItemData = {
            order_id: row.order_id,
            order_item_id: parseInt(row.order_item_id, 10),
            product_id: row.product_id,
            seller_id: row.seller_id,
            shipping_limit_date: new Date(row.shipping_limit_date),
            price: parseFloat(row.price),
            freight_value: parseFloat(row.freight_value),
          };
          orderItems.push(orderItemData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${orderItems.length} order items, inserting into DB...`);

        await OrderItem.bulkCreate(orderItems, { ignoreDuplicates: true });

        console.log("✅ 1000 Order Items Successfully Inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting order items:", error);
    process.exit(1);
  }
};

insertOrderItems();
