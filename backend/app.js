import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import sequelize from "./db/dbConnect.js"
import cors from "cors";

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
import reviewRoutes from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import shippingDetailRoute from "./routes/shippingDetail.route.js";
import categoryRoute from "./routes/category.route.js";
import analyticRoute from "./routes/analytic.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods:["GET","POST","DELETE","PUT"],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({
    path: "./backend/.env"
});

const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/shippingDetail", shippingDetailRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/analysis", analyticRoute);

sequelize.sync({ alter: true })
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
    console.error('Unable to sync database:', err);
});
