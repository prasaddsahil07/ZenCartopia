import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import sequelize from "./db/dbConnect.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({
    path: "./.env"
})

app.get("/", (req, res) => {
    console.log("Hello from ZenCartopia Server...");
    res.send("Welcome to ZenCartopia!");
});

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false })  // set force: true to drop tables and recreate on every run
.then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('Unable to sync database:', err);
});
