import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import sequelize from "./db/dbConnect.js"

import Customer from "./models/customer.model.js";
import Geolocation from "./models/geolocation.model.js";
import OrderItem from "./models/order_item.model.js";
import Order from "./models/order.model.js";
import Payment from "./models/payment.model.js";
import ProductCategory from "./models/product_category_name_translation.model.js";
import Product from "./models/product.model.js";
import Review from "./models/review.model.js"; 
import Seller from "./models/seller.model.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({
    path: "./backend/.env"
});

// console.log(process.env.ACCESS_TOKEN_SECRET);
// console.log(process.env.REFRESH_TOKEN_SECRET);


const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

sequelize.sync({ force: true })  // set force: true to drop tables and recreate on every run
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
    console.error('Unable to sync database:', err);
});
