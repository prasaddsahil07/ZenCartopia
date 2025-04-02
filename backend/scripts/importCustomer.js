import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Customer from "../models/customer.model.js";
import sequelize from "../db/dbConnect.js";

const insertCustomers = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const customers = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_customers_dataset.csv");

    // Fix: Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error(`❌ CSV file not found at: ${filePath}`);
        process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (customers.length < 1000) {
          // Ensure JSON format for customer_cart_items if exists
          if (row.customer_cart_items) {
            try {
              row.customer_cart_items = JSON.parse(row.customer_cart_items);
            } catch {
              row.customer_cart_items = [];
            }
          }

          // Apply default values manually if fields are empty or undefined
          const customerData = {
            customer_name: row.customer_name || "Sangita",
            customer_password: row.customer_password || "myPassword@123",
            customer_id: row.customer_id,
            customer_unique_id: row.customer_unique_id,
            customer_zip_code_prefix: row.customer_zip_code_prefix || null,
            customer_city: row.customer_city || null,
            customer_state: row.customer_state || null,
            customer_profile_pic: row.customer_profile_pic || null,
            customer_role: row.customer_role || "customer",
            customer_cart_items: row.customer_cart_items || [],
          };

          customers.push(customerData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${customers.length} customers, inserting into DB...`);

        await Customer.bulkCreate(customers, { ignoreDuplicates: true });

        console.log("✅ 1000 Customers Successfully Inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting customers:", error);
    process.exit(1);
  }
};

insertCustomers();
