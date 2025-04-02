import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Payment from "../models/payment.model.js";
import sequelize from "../db/dbConnect.js";

const insertPayments = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    const payments = [];
    const filePath = path.join(process.cwd(), "backend", "public", "olist_order_payments_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ CSV file not found at: ${filePath}`);
      process.exit(1);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (payments.length < 1000) {
          const paymentData = {
            order_id: row.order_id,
            payment_sequential: parseInt(row.payment_sequential, 10) || 1,
            payment_type: row.payment_type || "unknown",
            payment_installments: parseInt(row.payment_installments, 10) || 1,
            payment_value: parseFloat(row.payment_value) || 0.0,
          };
          payments.push(paymentData);
        }
      })
      .on("end", async () => {
        console.log(`📌 Read ${payments.length} payments, inserting into DB...`);

        await Payment.bulkCreate(payments, { ignoreDuplicates: true });

        console.log("✅ 1000 Payments Successfully Inserted!");
        process.exit();
      });
  } catch (error) {
    console.error("❌ Error inserting payments:", error);
    process.exit(1);
  }
};

insertPayments();
